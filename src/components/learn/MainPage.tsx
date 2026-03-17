'use client';

import { useState, Suspense, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sun, Moon, LayoutGrid, Folder, Orbit, Hand } from 'lucide-react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Center, Preload, useGLTF, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { BreadboardCategory } from './categories/breadboard';
import { DisplayCategory } from './categories/display';
import { GeneralCategory } from './categories/general';
import { InputCategory } from './categories/input';

// Configure Draco loader globally
useGLTF.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

// ==================== MODEL COMPONENT WITH DRACO ====================
function ComponentModel({ url, isActive, scale = 20 }: { url: string; isActive: boolean; scale?: number }) {
  const { scene } = useGLTF(url);
  const meshRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    return () => {
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach(m => m.dispose());
            } else {
              obj.material.dispose();
            }
          }
          if (obj.geometry) obj.geometry.dispose();
        }
      });
    };
  }, [scene]);

  if (!isActive) return null;

  return (
    <Center bottom position={[0, 10, 0]}>
      <primitive ref={meshRef} object={scene.clone()} scale={scale} />
    </Center>
  );
}

// ==================== CAMERA RESET ====================
function CameraReset({ position, target }: { 
  position: [number, number, number]; 
  target: [number, number, number] 
}) {
  const { camera, controls } = useThree();
  
  useEffect(() => {
    camera.position.set(...position);
    if (controls) {
      const orbitControls = controls as unknown as {
        target: THREE.Vector3;
        update: () => void;
      };
      orbitControls.target.set(...target);
      orbitControls.update();
    }
  }, [position, target, camera, controls]);

  return null;
}

// ==================== HEADER ====================
function Header({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) {
  const handleThemeToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!document.startViewTransition) {
      toggleTheme();
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => toggleTheme());
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
        },
        { duration: 750, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' }
      );
    });
  };

  return (
    <header className={`p-4 flex justify-between items-center border-b ${isDark ? 'border-blue-900/30' : 'border-blue-200/30'} backdrop-blur-sm`}>
      <Link href="/" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
        <ArrowLeft className="w-5 h-5" />
        Back Home
      </Link>
      <h1 className="text-2xl font-semibold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
        3D Component Viewer
      </h1>
      <button
        onClick={handleThemeToggle}
        className={`relative p-2 rounded-lg ${isDark ? 'bg-blue-900/20 hover:bg-blue-900/30' : 'bg-blue-100 hover:bg-blue-200'} transition-all duration-300`}
      >
        {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-600" />}
      </button>
    </header>
  );
}

// ==================== BACKGROUND ====================
function AnimatedBackground({ isDark }: { isDark: boolean}) {
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
  onFrameView
}: { 
  isDark: boolean;
  controlMode: 'orbit' | 'pan';
  setControlMode: (mode: 'orbit' | 'pan') => void;
  onFrameView: () => void;
}) {
  return (
    <div className={`absolute top-4 left-4 z-20 flex flex-col gap-1 rounded-lg border ${isDark ? 'bg-blue-950/40 border-blue-900/30' : 'bg-white/80 border-blue-200/30'} backdrop-blur-sm p-1`}>
      <button
        onClick={() => setControlMode('orbit')}
        className={`p-2 rounded-md transition-all duration-200 ${
          controlMode === 'orbit' 
            ? isDark ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
            : isDark ? 'hover:bg-blue-900/30' : 'hover:bg-blue-100'
        }`}
        title="Orbit Mode"
      >
        <Orbit className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => setControlMode('pan')}
        className={`p-2 rounded-md transition-all duration-200 ${
          controlMode === 'pan' 
            ? isDark ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
            : isDark ? 'hover:bg-blue-900/30' : 'hover:bg-blue-100'
        }`}
        title="Pan Mode"
      >
        <Hand className="w-4 h-4" />
      </button>

      <div className={`w-full h-px ${isDark ? 'bg-blue-900/30' : 'bg-blue-200/30'} my-1`} />

      <button
        onClick={onFrameView}
        className={`p-2 rounded-md transition-all duration-200 ${isDark ? 'hover:bg-blue-900/30' : 'hover:bg-blue-100'}`}
        title="Frame View"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
          <line x1="4" y1="10" x2="20" y2="10"></line>
          <line x1="4" y1="14" x2="20" y2="14"></line>
          <line x1="10" y1="4" x2="10" y2="20"></line>
          <line x1="14" y1="4" x2="14" y2="20"></line>
        </svg>
      </button>
    </div>
  );
}

// ==================== VIEW CONFIG ====================
const getModelViewConfig = (url: string): { position: [number, number, number]; target: [number, number, number] } => {
  // Breadboard
  if (url.includes('Breadboard63R10C')) 
    return { position: [40, 60, 90], target: [0, 12, 0] };
  if (url.includes('BreadboardMini')) 
    return { position: [35, 50, 75], target: [0, 10, 0] };
  if (url.includes('BreadboardSmall')) 
    return { position: [38, 55, 80], target: [0, 11, 0] };
  
  // Display
  if (url.includes('7SegmentClock')) 
    return { position: [30, 45, 65], target: [0, 8, 0] };
  if (url.includes('7SegmentDisplay')) 
    return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('LCD16x2_I2C'))
    return { position: [34, 50, 70], target: [0, 9, 0] };
  if (url.includes('LCD16x2')) 
    return { position: [32, 48, 68], target: [0, 8, 0] };
  
  // General - MAXIMUM ZOOM OUT with SLIGHTLY LOWER TARGET
  if (url.includes('Capacitor') && !url.includes('Polarized')) 
    return { position: [0, 120, 150], target: [0, 12, 0] };
  if (url.includes('PolarizedCapacitor')) 
    return { position: [0, 130, 160], target: [0, 14, 0] };
  if (url.includes('Resistor')) 
    return { position: [0, 100, 130], target: [0, 10, 0] };
  if (url.includes('Diode') && !url.includes('Zener')) 
    return { position: [0, 110, 140], target: [0, 11, 0] };
  if (url.includes('ZenerDiode')) 
    return { position: [0, 110, 140], target: [0, 11, 0] };
  if (url.includes('Inductor')) 
    return { position: [0, 125, 155], target: [0, 13, 0] };
  
  // Input - Using Display category settings
  if (url.includes('4x4Keypad')) 
    return { position: [30, 45, 65], target: [0, 8, 0] };
  if (url.includes('AmbientLightSensor')) 
    return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('DipSwitch')) 
    return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('FlexSensor')) 
    return { position: [30, 45, 65], target: [0, 8, 0] };
  if (url.includes('ForceSensor')) 
    return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('GasSensor')) 
    return { position: [30, 45, 65], target: [0, 8, 0] };
  if (url.includes('IRSensor')) 
    return { position: [30, 45, 65], target: [0, 8, 0] };
  if (url.includes('Photodiode')) 
    return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('Photoresistor')) 
    return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('PIRSensor')) 
    return { position: [32, 48, 68], target: [0, 9, 0] };
  if (url.includes('Potentiometer')) 
    return { position: [30, 45, 65], target: [0, 8, 0] };
  if (url.includes('PushButton')) 
    return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('SlideSwitch')) 
    return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('SoilMoistureSensor')) 
    return { position: [32, 48, 68], target: [0, 9, 0] };
  if (url.includes('TemperatureSensor')) 
    return { position: [28, 42, 60], target: [0, 7, 0] };
  if (url.includes('TiltSensor')) 
    return { position: [30, 45, 65], target: [0, 8, 0] };
  if (url.includes('UltrasonicDistanceSensor4Pins')) 
    return { position: [34, 50, 70], target: [0, 9, 0] };
  if (url.includes('UltrasonicDistanceSensor')) 
    return { position: [34, 50, 70], target: [0, 9, 0] };
  
  return { position: [30, 45, 65], target: [0, 8, 0] };
};

// ==================== MAIN PAGE ====================
export function MainPage() {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark(!isDark);
  
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
  const [fov, setFov] = useState(20);
  const [isLoading, setIsLoading] = useState(false);

  const handleModelSelect = useCallback((
    url: string, 
    position: [number, number, number], 
    target: [number, number, number] = [0, 8, 0],
    scale: number = 20
  ) => {
    setIsLoading(true);
    const viewConfig = getModelViewConfig(url);
    const finalPosition = position;
    const finalTarget = target;
    
    setSelectedModel({ url, position: finalPosition, target: finalTarget, scale });
    setCameraPosition(finalPosition);
    setCameraTarget(finalTarget);
    
    // Adjust FOV based on component type
    if (url.includes('Breadboard63R10C')) setFov(18);
    else if (url.includes('Breadboard')) setFov(19);
    else if (url.includes('Resistor') || url.includes('Diode')) setFov(25);
    else if (url.includes('Capacitor') || url.includes('Inductor')) setFov(26);
    else setFov(20);
    
    setModelKey(prev => prev + 1);
    
    // Simulate loading complete
    setTimeout(() => setIsLoading(false), 500);
  }, []);

  const handleFrameView = useCallback(() => {
    if (selectedModel) {
      setCameraPosition(selectedModel.position);
      setCameraTarget(selectedModel.target);
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
      `}</style>
      
      <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'} relative overflow-hidden flex flex-col`}>
        <AnimatedBackground isDark={isDark} />

        <div className="relative z-10 flex flex-col flex-grow">
          <Header isDark={isDark} toggleTheme={toggleTheme} />

          <main className="flex-grow grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 p-4">
            {/* Category Sidebar */}
            <aside className={`rounded-lg border ${isDark ? 'bg-blue-950/30 border-blue-900/30' : 'bg-white/50 border-blue-200/30'} backdrop-blur-sm p-4`}>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 text-blue-400" />
                Categories
              </h2>
              <ul className="space-y-1">
                <BreadboardCategory onModelSelect={handleModelSelect} />
                <DisplayCategory onModelSelect={handleModelSelect} />
                <GeneralCategory onModelSelect={handleModelSelect} />
                <InputCategory onModelSelect={handleModelSelect} />
                {['Motor', 'Output', 'Power', 'Power Control'].map((cat) => (
                  <li key={cat} className="flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors hover:bg-blue-500/10">
                    <Folder className="w-4 h-4 text-blue-400/80" />
                    <span>{cat}</span>
                  </li>
                ))}
              </ul>
            </aside>

            {/* 3D Viewer */}
            <div className={`rounded-lg border ${isDark ? 'bg-black/20 border-blue-900/30' : 'bg-white/20 border-blue-200/30'} backdrop-blur-sm flex items-center justify-center relative`}>
              <CameraControlPanel 
                isDark={isDark}
                controlMode={controlMode}
                setControlMode={setControlMode}
                onFrameView={handleFrameView}
              />
              
              {/* Loading indicator */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/20 backdrop-blur-sm">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              )}
              
              <div className="w-full h-full">
                <Canvas 
                  key={`canvas-${modelKey}`} 
                  camera={{ position: cameraPosition, fov: fov, near: 0.1, far: 1000 }}
                  gl={{ 
                    powerPreference: "high-performance",
                    antialias: true,
                    alpha: false
                  }}
                  performance={{ min: 0.5 }}
                >
                  <ambientLight intensity={1.2} />
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
                    sectionColor={isDark ? '#3f6a9e' : '#a0b8d0'}
                    cellColor={isDark ? '#2a4a6e' : '#c0d0e0'}
                  />
                  
                  <OrbitControls 
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
                      />
                    </Suspense>
                  )}
                  
                  <CameraReset position={cameraPosition} target={cameraTarget} />
                  <Preload all />
                </Canvas>
              </div>
              
              <div className="absolute bottom-4 left-4 text-xs text-gray-500">
                <p>{selectedModel ? '360° rotate • Zoom • Full inspection' : 'Select component'}</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}