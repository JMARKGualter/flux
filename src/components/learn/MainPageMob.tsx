'use client';

import { useState, Suspense, useRef, useEffect, useCallback } from 'react';
import { LayoutGrid, Orbit, Hand, RotateCw, ChevronDown, ChevronUp } from 'lucide-react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Center, useGLTF, Grid } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { BreadboardCategory } from './categories/breadboard';
import { DisplayCategory } from './categories/display';
import { GeneralCategory } from './categories/general';
import { InputCategory } from './categories/input';
import { MotorCategory } from './categories/motor';
import { OutputCategory } from './categories/output';
import { PowerCategory } from './categories/power';
import { PowerControlCategory } from './categories/powercontrol';
import { meshTooltips } from '@/lib/constants/tooltips';
import { ComponentGuideContainer } from './containers/ComponentGuideContainer';
import { PartInfoDisplay } from './containers/PartInfoDisplay';
import { TriviaDisplay } from './containers/TriviaDisplay';
import { Header } from './Header';
import { useTheme } from '@/contexts/ThemeContext';

// Configure Draco loader globally
useGLTF.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

// ==================== SIMPLE FPS COUNTER (NUMBERS ONLY) ====================
function FPSDisplay({ isDark }: { isDark: boolean }) {
  const [fps, setFps] = useState(0);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    let animationFrameId: number;

    const updateFPS = (timestamp: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = timestamp;
      }

      frameCountRef.current++;
      const delta = timestamp - lastTimeRef.current;

      if (delta >= 1000) {
        const currentFps = Math.round((frameCountRef.current * 1000) / delta);
        setFps(currentFps);
        frameCountRef.current = 0;
        lastTimeRef.current = timestamp;
      }

      animationFrameId = requestAnimationFrame(updateFPS);
    };

    animationFrameId = requestAnimationFrame(updateFPS);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const getStyles = () => {
    if (isDark) {
      return {
        container: 'bg-gray-900/50 border-gray-700',
        text: fps >= 55 ? 'text-green-400' : fps >= 30 ? 'text-yellow-400' : 'text-red-400'
      };
    } else {
      return {
        container: 'bg-white/90 border-gray-300 shadow-md',
        text: fps >= 55 ? 'text-green-600' : fps >= 30 ? 'text-yellow-600' : 'text-red-600'
      };
    }
  };

  const styles = getStyles();

  return (
    <div className={`
      px-2 py-0.5 rounded-md backdrop-blur-sm border
      font-mono text-[10px] font-bold ${styles.container} ${styles.text}
    `}>
      {fps} FPS
    </div>
  );
}

// ==================== MODEL COMPONENT WITH DIRECT RAYCASTING ====================
function ComponentModel({ url, isActive, scale = 20, onTooltipChange }: {
  url: string;
  isActive: boolean;
  scale?: number;
  onTooltipChange?: (tooltip: { text: string; x: number; y: number } | null) => void;
}) {
  const { scene } = useGLTF(url);
  const { camera, gl } = useThree();
  const sceneRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!isActive) return;

    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        if (Array.isArray(obj.material)) {
          obj.material.forEach(m => m.side = THREE.DoubleSide);
        } else {
          obj.material.side = THREE.DoubleSide;
        }
      }
    });

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let currentHovered: string | null = null;

    const onPointerMove = (e: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      scene.updateMatrixWorld(true);

      const intersects = raycaster.intersectObjects(scene.children, true);

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;

        if (hit.name !== currentHovered) {
          currentHovered = hit.name;

          if (meshTooltips[hit.name]) {
            onTooltipChange?.({ text: meshTooltips[hit.name], x: x + 12, y });
            document.body.style.cursor = 'pointer';
          } else {
            onTooltipChange?.(null);
            document.body.style.cursor = 'default';
          }
        } else if (currentHovered && meshTooltips[currentHovered]) {
          onTooltipChange?.({ text: meshTooltips[currentHovered], x: x + 12, y });
        }
      } else {
        if (currentHovered) {
          currentHovered = null;
          onTooltipChange?.(null);
          document.body.style.cursor = 'default';
        }
      }
    };

    gl.domElement.addEventListener('pointermove', onPointerMove);

    return () => {
      gl.domElement.removeEventListener('pointermove', onPointerMove);
      document.body.style.cursor = 'default';
      onTooltipChange?.(null);
    };
  }, [scene, camera, gl, isActive, onTooltipChange]);

  if (!isActive) return null;

  return (
    <Center bottom position={[0, 10, 0]}>
      <group ref={sceneRef}>
        <primitive object={scene} scale={scale} />
      </group>
    </Center>
  );
}

// ==================== BACKGROUND ====================
function AnimatedBackground({ isDark }: { isDark: boolean }) {
  return (
    <>
      <div className={`absolute inset-0 bg-[linear-gradient(rgba(30,58,138,${isDark ? 0.1 : 0.05})_1px,transparent_1px),linear-gradient(90deg,rgba(30,58,138,${isDark ? 0.1 : 0.05})_1px,transparent_1px)] bg-[size:50px_50px]`} />
      <div className={`absolute top-1/4 right-1/4 w-96 h-96 ${isDark ? 'bg-blue-900/20' : 'bg-blue-300/20'} rounded-full blur-3xl`} />
      <div className={`absolute bottom-1/4 left-1/4 w-96 h-96 ${isDark ? 'bg-blue-800/10' : 'bg-indigo-200/10'} rounded-full blur-3xl`} />
    </>
  );
}

// ==================== CONTROL PANEL ====================
function CameraControlPanel({
  isDark,
  controlMode,
  setControlMode,
  onFrameView,
}: {
  isDark: boolean;
  controlMode: 'orbit' | 'pan';
  setControlMode: (mode: 'orbit' | 'pan') => void;
  onFrameView: () => void;
}) {
  return (
    <div className={`absolute top-2 left-2 z-20 flex flex-row gap-1 rounded-lg border ${isDark ? 'bg-blue-950/40 border-blue-900/30' : 'bg-white/80 border-blue-200/30'} backdrop-blur-sm p-1`}>
      <button
        onClick={() => setControlMode('orbit')}
        className={`p-1.5 rounded-md transition-all duration-200 ${
          controlMode === 'orbit'
            ? isDark ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
            : isDark ? 'hover:bg-blue-900/30' : 'hover:bg-blue-100'
        }`}
        title="Orbit Mode (Rotate)"
      >
        <Orbit className="w-3 h-3" />
      </button>

      <button
        onClick={() => setControlMode('pan')}
        className={`p-1.5 rounded-md transition-all duration-200 ${
          controlMode === 'pan'
            ? isDark ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
            : isDark ? 'hover:bg-blue-900/30' : 'hover:bg-blue-100'
        }`}
        title="Pan Mode (Move)"
      >
        <Hand className="w-3 h-3" />
      </button>

      <div className={`w-px h-4 ${isDark ? 'bg-blue-900/30' : 'bg-blue-200/30'} mx-1`} />

      <button
        onClick={onFrameView}
        className={`p-1.5 rounded-md transition-all duration-200 ${
          isDark ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
        title="Reset View"
      >
        <RotateCw className="w-3 h-3" />
      </button>
    </div>
  );
}

// ==================== CATEGORY GRID COMPONENT ====================
function CategoryGrid({ onModelSelect }: { onModelSelect: (url: string, position: [number, number, number], target: [number, number, number], scale?: number) => void }) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const { isDark } = useTheme();

  const categories = [
    { name: 'Breadboard', component: BreadboardCategory, key: 'breadboard' },
    { name: 'Display', component: DisplayCategory, key: 'display' },
    { name: 'General', component: GeneralCategory, key: 'general' },
    { name: 'Input', component: InputCategory, key: 'input' },
    { name: 'Motor', component: MotorCategory, key: 'motor' },
    { name: 'Output', component: OutputCategory, key: 'output' },
    { name: 'Power', component: PowerCategory, key: 'power' },
    { name: 'Power Control', component: PowerControlCategory, key: 'powercontrol' },
  ];

  const handleCategorySelect = (url: string, position: [number, number, number], target: [number, number, number], scale: number = 20) => {
    onModelSelect(url, position, target, scale);
    setExpandedCategory(null); // Collapse after selection
  };

  const toggleCategory = (key: string) => {
    setExpandedCategory(expandedCategory === key ? null : key);
  };

  return (
    <div className="grid grid-cols-1 gap-2">
      {categories.map((category) => (
        <div key={category.key} className="flex flex-col">
          {/* Category Button */}
          <button
            onClick={() => toggleCategory(category.key)}
            className={`w-full p-2 rounded-lg text-left text-xs font-medium transition-all flex items-center justify-between ${
              isDark 
                ? 'bg-blue-900/30 hover:bg-blue-800/40 text-blue-300 border border-blue-700/50'
                : 'bg-blue-100/80 hover:bg-blue-200/80 text-blue-800 border border-blue-300/50'
            }`}
          >
            <span>{category.name}</span>
            {expandedCategory === category.key ? (
              <ChevronUp className="w-3 h-3 flex-shrink-0" />
            ) : (
              <ChevronDown className="w-3 h-3 flex-shrink-0" />
            )}
          </button>
          
          {/* Expandable Content - Expands within container */}
          {expandedCategory === category.key && (
            <div className={`mt-1 p-2 rounded-lg border ${
              isDark 
                ? 'bg-blue-900/20 border-blue-700/30'
                : 'bg-blue-50 border-blue-200'
            }`}>
              <category.component onModelSelect={handleCategorySelect} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ==================== VIEW CONFIG ====================
const getModelViewConfig = (url: string): { position: [number, number, number]; target: [number, number, number] } => {
  if (url.includes('Breadboard63R10C')) return { position: [40, 60, 90], target: [0, 12, 0] };
  if (url.includes('BreadboardSmall')) return { position: [38, 55, 80], target: [0, 11, 0] };
  if (url.includes('BreadboardMini')) return { position: [35, 50, 75], target: [0, 10, 0] };
  if (url.includes('7SegmentClock')) return { position: [30, 45, 65], target: [0, 8, 0] };
  if (url.includes('7SegmentDisplay')) return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('LCD16x2_I2C')) return { position: [34, 50, 70], target: [0, 9, 0] };
  if (url.includes('LCD16x2')) return { position: [32, 48, 68], target: [0, 8, 0] };
  if (url.includes('Capacitor') && !url.includes('Polarized')) return { position: [0, 120, 150], target: [0, 12, 0] };
  if (url.includes('PolarizedCapacitor')) return { position: [0, 130, 160], target: [0, 14, 0] };
  if (url.includes('Resistor')) return { position: [0, 100, 130], target: [0, 10, 0] };
  if (url.includes('Diode') && !url.includes('Zener')) return { position: [0, 110, 140], target: [0, 11, 0] };
  if (url.includes('ZenerDiode')) return { position: [0, 110, 140], target: [0, 11, 0] };
  if (url.includes('Inductor')) return { position: [0, 125, 155], target: [0, 13, 0] };
  if (url.includes('4x4Keypad')) return { position: [30, 45, 65], target: [0, 8, 0] };
  if (url.includes('AmbientLightSensor')) return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('DipSwitch')) return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('FlexSensor')) return { position: [30, 45, 65], target: [0, 8, 0] };
  if (url.includes('ForceSensor')) return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('GasSensor')) return { position: [30, 45, 65], target: [0, 8, 0] };
  if (url.includes('IRSensor')) return { position: [30, 45, 65], target: [0, 8, 0] };
  if (url.includes('Photodiode')) return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('Photoresistor')) return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('PIRSensor')) return { position: [32, 48, 68], target: [0, 9, 0] };
  if (url.includes('Potentiometer')) return { position: [30, 45, 65], target: [0, 8, 0] };
  if (url.includes('PushButton')) return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('SlideSwitch')) return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('SoilMoistureSensor')) return { position: [32, 48, 68], target: [0, 9, 0] };
  if (url.includes('TemperatureSensor')) return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('TiltSensor')) return { position: [30, 45, 65], target: [0, 8, 0] };
  if (url.includes('UltrasonicDistanceSensor4Pins')) return { position: [34, 50, 70], target: [0, 9, 0] };
  if (url.includes('UltrasonicDistanceSensor')) return { position: [34, 50, 70], target: [0, 9, 0] };
  if (url.includes('DCMotor')) return { position: [30, 45, 65], target: [0, 8, 0] };
  if (url.includes('DCMotorWithEncoder')) return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('HobbyGearMotor')) return { position: [34, 50, 70], target: [0, 9, 0] };
  if (url.includes('MicroServo')) return { position: [32, 48, 68], target: [0, 8, 0] };
  if (url.includes('VibrationMotor')) return { position: [32, 48, 68], target: [0, 8, 0] };
  if (url.includes('LED')) return { position: [30, 45, 65], target: [0, 8, 0] };
  if (url.includes('RGBLED')) return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('LightBulb')) return { position: [34, 50, 70], target: [0, 9, 0] };
  if (url.includes('NeoPixel')) return { position: [32, 48, 68], target: [0, 8, 0] };
  if (url.includes('PiezoBuzzer')) return { position: [32, 48, 68], target: [0, 8, 0] };
  if (url.includes('15Battery')) return { position: [30, 45, 65], target: [0, 8, 0] };
  if (url.includes('9Battery')) return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('CoinCell')) return { position: [34, 50, 70], target: [0, 9, 0] };
  if (url.includes('SolarCell')) return { position: [32, 48, 68], target: [0, 8, 0] };
  if (url.includes('nMOSMOSFET')) return { position: [30, 45, 65], target: [0, 8, 0] };
  if (url.includes('pMOSMOSFET')) return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('NPNTransistor')) return { position: [34, 50, 70], target: [0, 9, 0] };
  if (url.includes('PNPTransistor')) return { position: [32, 48, 68], target: [0, 8, 0] };
  if (url.includes('nMOSTransistor')) return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('pMOSTransistor')) return { position: [34, 50, 70], target: [0, 9, 0] };
  if (url.includes('TIP120')) return { position: [32, 48, 68], target: [0, 8, 0] };
  return { position: [30, 45, 65], target: [0, 8, 0] };
};

// ==================== MOBILE MAIN PAGE ====================
export function MainPageMob() {
  const { isDark } = useTheme();
  const viewerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const [selectedModel, setSelectedModel] = useState<{
    url: string;
    position: [number, number, number];
    target: [number, number, number];
    scale: number;
  } | null>(null);

  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([30, 45, 65]);
  const [cameraTarget, setCameraTarget] = useState<[number, number, number]>([0, 8, 0]);
  const [controlMode, setControlMode] = useState<'orbit' | 'pan'>('orbit');
  const [modelKey, setModelKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  const handleModelSelect = useCallback((
    url: string,
    position: [number, number, number],
    target: [number, number, number] = [0, 8, 0],
    scale: number = 20
  ) => {
    setIsLoading(true);
    setTooltip(null);
    setSelectedModel({ url, position, target, scale });
    setCameraPosition(position);
    setCameraTarget(target);
    setModelKey(prev => prev + 1);
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const handleFrameView = useCallback(() => {
    if (selectedModel) {
      setCameraPosition([...selectedModel.position]);
      setCameraTarget([...selectedModel.target]);
      
      if (controlsRef.current) {
        controlsRef.current.target.set(selectedModel.target[0], selectedModel.target[1], selectedModel.target[2]);
        controlsRef.current.update();
      }
    } else {
      setCameraPosition([30, 45, 65]);
      setCameraTarget([0, 8, 0]);
    }
  }, [selectedModel]);

  return (
    <>
      <style>{`
        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: none;
          mix-blend-mode: normal;
        }
        
        html, body {
          overflow: auto !important;
          height: auto !important;
        }
      `}</style>

      <div 
        className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'} relative overflow-x-hidden flex flex-col`}
      >
        <AnimatedBackground isDark={isDark} />

        <div className="relative z-10 flex flex-col flex-grow">
          <Header />

          <main className="flex-1 container mx-auto px-3 py-4">
            <div className="space-y-4">
              {/* Category Grid - Expandable categories */}
              <div className={`rounded-lg border p-3 backdrop-blur-sm ${isDark ? 'bg-blue-950/30 border-blue-900/30' : 'bg-white/50 border-blue-200/30'}`}>
                <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4 text-blue-400" />
                  <span>Categories</span>
                </h2>
                <CategoryGrid onModelSelect={handleModelSelect} />
              </div>

              {/* 3D Viewer */}
              <div
                ref={viewerRef}
                className={`rounded-lg border backdrop-blur-sm relative ${isDark ? 'bg-black/20 border-blue-900/30' : 'bg-white/20 border-blue-200/30'}`}
                style={{
                  width: '100%',
                  height: 'clamp(280px, 45vh, 400px)',
                }}
              >
                <div className="absolute top-2 right-2 z-30">
                  <FPSDisplay isDark={isDark} />
                </div>

                <CameraControlPanel
                  isDark={isDark}
                  controlMode={controlMode}
                  setControlMode={setControlMode}
                  onFrameView={handleFrameView}
                />

                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/20 backdrop-blur-sm">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  </div>
                )}

                <div className="w-full h-full">
                  <Canvas
                    camera={{ position: cameraPosition, fov: 20, near: 0.1, far: 1000 }}
                    onCreated={({ gl }) => {
                      gl.domElement.addEventListener('webglcontextlost', (e) => {
                        e.preventDefault();
                      });
                    }}
                  >
                    <ambientLight intensity={5} />
                    <directionalLight position={[30, 60, 30]} intensity={3} />
                    <directionalLight position={[-30, 50, 20]} intensity={2.5} />
                    <directionalLight position={[0, 80, -30]} intensity={2} />
                    <pointLight position={[0, 50, 0]} intensity={1.5} />

                    <Grid
                      cellSize={2}
                      sectionSize={10}
                      cellThickness={1}
                      sectionThickness={1.5}
                      infiniteGrid
                      fadeDistance={400}
                      fadeStrength={5}
                      sectionColor={isDark ? '#c7d4e4' : '#a0b8d0'}
                      cellColor={isDark ? '#adb8c4' : '#ffffff'}
                    />

                    <OrbitControls
                      ref={controlsRef}
                      enablePan={true}
                      enableZoom={true}
                      enableRotate={true}
                      autoRotate={false}
                      maxDistance={300}
                      minDistance={30}
                      maxPolarAngle={Math.PI}
                      minPolarAngle={0}
                      mouseButtons={{
                        LEFT: controlMode === 'orbit' ? THREE.MOUSE.ROTATE : THREE.MOUSE.PAN,
                        MIDDLE: THREE.MOUSE.DOLLY,
                        RIGHT: controlMode === 'orbit' ? THREE.MOUSE.PAN : THREE.MOUSE.ROTATE,
                      }}
                    />

                    {selectedModel && (
                      <Suspense fallback={null}>
                        <ComponentModel
                          key={`model-${modelKey}`}
                          url={selectedModel.url}
                          isActive={true}
                          scale={selectedModel.scale}
                          onTooltipChange={setTooltip}
                        />
                      </Suspense>
                    )}
                  </Canvas>
                </div>

                <div className="absolute bottom-2 left-2 text-[9px] text-gray-500">
                  <p>{selectedModel ? 'Hover parts • Rotate • Zoom' : 'Select a component'}</p>
                </div>

                {tooltip && (
                  <div
                    className="absolute z-50 pointer-events-none"
                    style={{ left: tooltip.x + 8, top: tooltip.y }}
                  >
                    <div className={`text-[9px] px-2 py-1 rounded-lg shadow-lg max-w-[180px] border ${
                      isDark
                        ? 'bg-gray-900 border-blue-500/40 text-white'
                        : 'bg-white border-blue-300/40 text-gray-900'
                    }`}>
                      {tooltip.text}
                    </div>
                  </div>
                )}
              </div>

              {/* Component Guide */}
              <div className={`rounded-lg border backdrop-blur-sm overflow-hidden ${isDark ? 'bg-blue-950/30 border-blue-900/30' : 'bg-white/50 border-blue-200/30'}`}>
                <ComponentGuideContainer 
                  isDark={isDark} 
                  selectedModel={selectedModel} 
                  tooltip={tooltip} 
                />
              </div>

              {/* Two containers - Equal split */}
              <div className="grid grid-cols-1 gap-4">
                <div className={`rounded-lg border backdrop-blur-sm overflow-hidden ${isDark ? 'bg-blue-950/30 border-blue-900/30' : 'bg-white/50 border-blue-200/30'}`}>
                  <PartInfoDisplay 
                    isDark={isDark} 
                    selectedModel={selectedModel} 
                    hoveredPartName={tooltip?.text ? tooltip.text.split(' - ')[0] : undefined} 
                  />
                </div>

                <div className={`rounded-lg border backdrop-blur-sm overflow-hidden ${isDark ? 'bg-blue-950/30 border-blue-900/30' : 'bg-white/50 border-blue-200/30'}`}>
                  <TriviaDisplay 
                    isDark={isDark} 
                    selectedModel={selectedModel} 
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}