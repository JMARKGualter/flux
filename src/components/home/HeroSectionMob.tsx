'use client';

import { Zap, Headset } from 'lucide-react';
import { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Center, Preload } from '@react-three/drei';
import { logo2Url } from '@/lib/constants/models';
import Link from 'next/link';

function LogoModel() {
  const { scene } = useGLTF(logo2Url);
  return (
    <Center>
      <primitive object={scene} scale={0.13} /> {/* Reduced from 0.18 to 0.13 - slightly zoomed out */}
    </Center>
  );
}

interface HeroSectionMobProps {
  isDark: boolean;
}

export function HeroSectionMob({ isDark }: HeroSectionMobProps) {
  const [showVrTooltip, setShowVrTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    const touch = e.touches[0];
    setTooltipPosition({
      x: touch.clientX + 15,
      y: touch.clientY - 20
    });
    setShowVrTooltip(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLButtonElement>) => {
    const touch = e.touches[0];
    setTooltipPosition({
      x: touch.clientX + 15,
      y: touch.clientY - 20
    });
  };

  const handleTouchEnd = () => {
    setShowVrTooltip(false);
  };

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
    <div className="w-full py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6">
          {/* Text Content */}
          <div className="text-center">
            <h1 className={`text-2xl sm:text-3xl font-bold mb-3 bg-gradient-to-r ${isDark ? 'from-white via-blue-200 to-blue-400' : 'from-black via-blue-900 to-blue-600'} bg-clip-text text-transparent`}>
              Welcome to 3D workbench
            </h1>
            <p className={`text-sm sm:text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Explore the fascinating world of 3D design, electrical engineering, and cutting-edge technology. 
              Learn about circuit boards, semiconductors, and the future of electronics.
            </p>
            
            {/* Buttons - Fixed width */}
            <div className="flex flex-col items-center gap-3 mt-6">
              <Link
                href="/learn"
                className={`flex items-center justify-center gap-2 w-[240px] px-4 py-2.5 rounded-lg transition-all shadow-lg ${
                  isDark 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-blue-500/50 hover:shadow-blue-500/70' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-blue-400/50 hover:shadow-blue-400/70'
                }`}
              >
                Start Learning
                <Zap className="w-4 h-4" />
              </Link>

              <div>
                <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Have a VR HEADSET? Click below
                </p>
                <div className="relative">
                  <button
                    ref={buttonRef}
                    disabled
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseMove={handleMouseMove}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    className={`flex items-center justify-center gap-2 w-[240px] px-4 py-2.5 rounded-lg transition-all cursor-not-allowed ${
                      isDark 
                        ? 'bg-gray-700 text-gray-400 border border-gray-600 hover:bg-gray-600' 
                        : 'bg-gray-300 text-gray-500 border border-gray-400 hover:bg-gray-200'
                    }`}
                  >
                    Start Learning in VR
                    <Headset className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 3D Model */}
          <div className="mt-4">
            <div className={`relative bg-gradient-to-br ${isDark ? 'from-blue-950/50 to-blue-900/30' : 'from-blue-100/50 to-blue-50/30'} rounded-2xl border ${isDark ? 'border-blue-500/30' : 'border-blue-300/30'} p-3 backdrop-blur-sm`}>
              <div className="w-full h-[220px] sm:h-[260px] relative">
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
                  <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} autoRotate={true} autoRotateSpeed={-7.5} />
                  <Suspense fallback={null}>
                    <LogoModel />
                    <Preload all />
                  </Suspense>
                </Canvas>
              </div>
              <div className="mt-2 text-center">
                <p className={`text-[10px] sm:text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Interactive 3D Logo</p>
                <p className={`text-[8px] sm:text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-0.5`}>Click and drag to rotate</p>
              </div>
              <p className="absolute bottom-1 right-1 text-[8px] text-gray-500">MADE WITH LOVE FOR THE TRIOE COMMUNITY</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {showVrTooltip && (
        <div
          className="fixed z-[9999] pointer-events-none"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            transform: 'translate(0, -50%)'
          }}
        >
          <div className={`px-2 py-1 rounded-lg text-[10px] font-medium whitespace-nowrap shadow-lg animate-fade-in ${
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