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
      <primitive object={scene} scale={0.12} />
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
    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
      {/* Text Content */}
      <div className="space-y-4 sm:space-y-6 text-center lg:text-left order-1 lg:order-none px-2 sm:px-0">
        <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r ${isDark ? 'from-white via-blue-200 to-blue-400' : 'from-black via-blue-900 to-blue-600'} bg-clip-text text-transparent`}>
          Welcome to 3D workbench
        </h1>
        <p className={`text-base sm:text-lg lg:text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'} max-w-2xl mx-auto lg:mx-0`}>
          Explore the fascinating world of 3D design, electrical engineering, and cutting-edge technology. 
          Learn about circuit boards, semiconductors, and the future of electronics.
        </p>
        
        {/* Buttons Container */}
        <div className="flex flex-col items-center lg:items-start gap-4 sm:gap-6">
          {/* Start Learning Button */}
          <Link
            href="/learn"
            className={`flex items-center justify-center gap-2 w-full sm:w-[280px] lg:w-[260px] px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all shadow-lg ${
              isDark 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-blue-500/50 hover:shadow-blue-500/70' 
                : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-blue-400/50 hover:shadow-blue-400/70'
            }`}
          >
            Start Learning
            <Zap className="w-5 h-5" />
          </Link>

          {/* VR Section */}
          <div className="w-full">
            <p className={`text-xs sm:text-sm mb-2 text-center lg:text-left ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Have a VR HEADSET? Click below
            </p>
            <div className="relative flex justify-center lg:justify-start">
              <button
                ref={buttonRef}
                disabled
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                className={`flex items-center justify-center gap-2 w-full sm:w-[280px] lg:w-[260px] px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all cursor-not-allowed ${
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

      {/* 3D Model */}
      <div className="relative w-full order-2 lg:order-none mt-6 lg:mt-0">
        <div className={`absolute inset-0 bg-gradient-to-r ${isDark ? 'from-blue-600/20 to-purple-600/20' : 'from-blue-400/20 to-purple-400/20'} rounded-2xl blur-3xl`} />
        <div className={`relative bg-gradient-to-br ${isDark ? 'from-blue-950/50 to-blue-900/30' : 'from-blue-100/50 to-blue-50/30'} rounded-2xl border ${isDark ? 'border-blue-500/30' : 'border-blue-300/30'} p-4 sm:p-6 lg:p-8 backdrop-blur-sm`}>
          <div className="h-[250px] sm:h-[350px] lg:h-[400px] relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className={`text-[5rem] sm:text-[8rem] lg:text-[12.5rem] font-black select-none ${isDark ? 'text-blue-900/40' : 'text-blue-200/70'}`}>
                TRIOE
              </span>
            </div>
            <Canvas 
              camera={{ position: [0, 0, 1.2], fov: 14 }} 
              gl={{ antialias: true }}
              dpr={[1, 2]}
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
          <div className="mt-3 sm:mt-4 text-center">
            <p className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Interactive 3D Logo</p>
            <p className={`text-[10px] sm:text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>Click and drag to rotate</p>
          </div>
          <p className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 text-[8px] sm:text-[10px] text-gray-500">MADE WITH LOVE FOR THE TRIOE COMMUNITY</p>
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
          <div className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap shadow-lg animate-fade-in ${
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