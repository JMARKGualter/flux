'use client';

import { Zap, Headset } from 'lucide-react';
import { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { useGLTF, OrbitControls, Center, Preload } from '@react-three/drei';
import { logo2Url } from '@/lib/constants/models';
import * as THREE from 'three';
import Link from 'next/link';

function LogoModel() {
  const { scene } = useGLTF(logo2Url);
  const { camera, gl } = useThree();

  useEffect(() => {
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    let mouseDownX = 0;
    let mouseDownY = 0;
    let isDragging = false;
    const DRAG_THRESHOLD = 5; // pixels of movement before considered a drag

    const onPointerDown = (e: PointerEvent) => {
      mouseDownX = e.clientX;
      mouseDownY = e.clientY;
      isDragging = false;
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();

      // Check if dragging
      const dx = e.clientX - mouseDownX;
      const dy = e.clientY - mouseDownY;
      if (Math.sqrt(dx * dx + dy * dy) > DRAG_THRESHOLD) {
        isDragging = true;
      }

      // Cursor feedback
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      scene.updateMatrixWorld(true);

      const intersects = raycaster.intersectObjects(scene.children, true);
      gl.domElement.style.cursor = intersects.length > 0 && !isDragging ? 'pointer' : 'default';
    };

    const onClick = (e: MouseEvent) => {
      // Ignore if the user was dragging
      if (isDragging) return;

      const rect = gl.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      scene.updateMatrixWorld(true);

      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        window.open('https://trioe.dev/', '_blank');
      }
    };

    gl.domElement.addEventListener('pointerdown', onPointerDown);
    gl.domElement.addEventListener('pointermove', onPointerMove);
    gl.domElement.addEventListener('click', onClick);

    return () => {
      gl.domElement.removeEventListener('pointerdown', onPointerDown);
      gl.domElement.removeEventListener('pointermove', onPointerMove);
      gl.domElement.removeEventListener('click', onClick);
      gl.domElement.style.cursor = 'default';
    };
  }, [scene, camera, gl]);

  return (
    <Center>
      <primitive object={scene} scale={0.15} />
    </Center>
  );
}

interface HeroSectionProps {
  isDark: boolean;
}

export function HeroSection({ isDark }: HeroSectionProps) {
  const [showVrTooltip, setShowVrTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTooltipPosition({
      x: e.clientX + 15,
      y: e.clientY - 20
    });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowVrTooltip(true);
    handleMouseMove(e);
  };

  const handleMouseLeave = () => {
    setShowVrTooltip(false);
  };

  return (
    <div className="w-full py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">

          {/* Left Column - Text Content */}
          <div className="flex-1">
            <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 text-center lg:text-left bg-gradient-to-r ${isDark ? 'from-white via-blue-200 to-blue-400' : 'from-black via-blue-900 to-blue-600'} bg-clip-text text-transparent`}>
              Welcome to 3D workbench
            </h1>
            <p className={`text-base sm:text-lg lg:text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'} mb-6 lg:mb-8 text-center lg:text-left`}>
              Explore the fascinating world of 3D design, electrical engineering, and cutting-edge technology.
              Learn about circuit boards, semiconductors, and the future of electronics.
            </p>

            {/* Buttons */}
            <div className="flex flex-col items-center lg:items-start gap-4">
              <Link
                href="/learn"
                className={`flex items-center justify-center gap-2 w-[260px] px-6 py-3 rounded-lg transition-all shadow-lg ${
                  isDark
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-blue-500/50 hover:shadow-blue-500/70'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-blue-400/50 hover:shadow-blue-400/70'
                }`}
              >
                Start Learning
                <Zap className="w-5 h-5" />
              </Link>

              <div>
                <p className={`text-sm mb-2 text-center lg:text-left ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <br />
                  <br />
                  Have a VR HEADSET? Click below
                </p>
                <div className="relative">
                  <button
                    ref={buttonRef}
                    disabled
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                    className={`flex items-center justify-center gap-2 w-[260px] px-6 py-3 rounded-lg transition-all cursor-not-allowed ${
                      isDark
                        ? 'bg-gray-700 text-gray-400 border border-gray-600 hover:bg-gray-600'
                        : 'bg-gray-300 text-gray-500 border border-gray-400 hover:bg-gray-200'
                    }`}
                  >
                    Start Learning in VR
                    <Headset className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - 3D Model */}
          <div className="flex-1 mt-8 lg:mt-0">
            <div className={`relative bg-gradient-to-br ${isDark ? 'from-blue-950/50 to-blue-900/30' : 'from-blue-100/50 to-blue-50/30'} rounded-2xl border ${isDark ? 'border-blue-500/30' : 'border-blue-300/30'} p-4 sm:p-6 backdrop-blur-sm`}>

              {/* Background Text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <span className={`text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black select-none opacity-30 ${isDark ? 'text-blue-800' : 'text-blue-300'}`}>
                  TRIOE
                </span>
              </div>

              {/* 3D Canvas */}
              <div className="w-full h-[250px] sm:h-[300px] lg:h-[350px] relative z-10">
                <Canvas
                  camera={{ position: [0, 0, 1.5], fov: 14 }}
                  gl={{ antialias: true }}
                  dpr={[1, 2]}
                  style={{ touchAction: 'auto' }}
                >
                  <ambientLight intensity={0.6} />
                  <directionalLight position={[5, 5, 5]} intensity={1.2} />
                  <directionalLight position={[-5, -5, -2]} intensity={0.4} />
                  <pointLight position={[0, 0, 2]} intensity={0.8} />
                  <OrbitControls
                    enablePan={true}
                    enableZoom={true}
                    enableRotate={true}
                    autoRotate={true}
                    autoRotateSpeed={-7.5}
                    minDistance={1}
                    maxDistance={3}
                    zoomSpeed={0.8}
                  />
                  <Suspense fallback={null}>
                    <LogoModel />
                    <Preload all />
                  </Suspense>
                </Canvas>
              </div>

              <div className="relative z-10 mt-3 text-center">
                <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Interactive 3D Logo
                </p>
                <p className={`text-[10px] sm:text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>
                  Click and drag to rotate • Click the logo to visit
                </p>
              </div>

              <p className="absolute bottom-2 right-2 text-[8px] sm:text-[10px] text-gray-500 z-10">
                MADE WITH LOVE FOR THE TRIOE COMMUNITY
              </p>
              <p className="absolute bottom-2 left-2 text-[8px] sm:text-[10px] text-gray-500 z-10">
                TRY CLICKING THE LOGO ;)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* VR Tooltip */}
      {showVrTooltip && (
        <div
          className="fixed z-[9999] pointer-events-none"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transform: 'translate(0, -50%)'
          }}
        >
          <div className={`px-2 py-1 rounded-lg text-xs font-medium whitespace-nowrap shadow-lg animate-fade-in ${
            isDark
              ? 'bg-gray-900 text-yellow-400 border border-yellow-500/50'
              : 'bg-gray-800 text-yellow-300 border border-yellow-400/50'
          }`}>
            ✨ Coming Soon ✨
          </div>
        </div>
      )}
    </div>
  );
}