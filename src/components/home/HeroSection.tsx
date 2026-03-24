'use client';

import { Zap, Headset } from 'lucide-react';
import { Suspense, useState } from 'react';
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

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6 pl-6">
        <h1 className={`text-5xl mb-6 bg-gradient-to-r ${isDark ? 'from-white via-blue-200 to-blue-400' : 'from-black via-blue-900 to-blue-600'} bg-clip-text text-transparent`}>
          Welcome to 3D workbench
        </h1>
        <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Explore the fascinating world of 3D design, electrical engineering, and cutting-edge technology. 
          Learn about circuit boards, semiconductors, and the future of electronics.
        </p>
        
        {/* Buttons Container */}
        <div className="flex flex-col">
          {/* Start Learning Button */}
          <Link
            href="/learn"
            className={`flex items-center justify-center gap-2 w-[260px] px-8 py-4 rounded-lg transition-all shadow-lg ${
              isDark 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-blue-500/50 hover:shadow-blue-500/70' 
                : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-blue-400/50 hover:shadow-blue-400/70'
            }`}
          >
            Start Learning
            <Zap className="w-5 h-5" />
          </Link>

          {/* VR Section with more spacing */}
          <div className="mt-8">
            <p className={`text-sm mb-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Have a VR HEADSET? Click below
            </p>
            <div className="relative">
              <button
                disabled
                onMouseEnter={() => setShowVrTooltip(true)}
                onMouseLeave={() => setShowVrTooltip(false)}
                className={`flex items-center justify-center gap-2 w-[260px] px-8 py-4 rounded-lg transition-all cursor-not-allowed ${
                  isDark 
                    ? 'bg-gray-700 text-gray-400 border border-gray-600' 
                    : 'bg-gray-300 text-gray-500 border border-gray-400'
                }`}
              >
                Start Learning in VR
                <Headset className="w-5 h-5" />
              </button>
              
              {/* Tooltip */}
              {showVrTooltip && (
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-50">
                  <div className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap shadow-lg ${
                    isDark 
                      ? 'bg-gray-800 text-yellow-400 border border-yellow-500/30' 
                      : 'bg-gray-700 text-yellow-300 border border-yellow-400/30'
                  }`}>
                    Coming Soon
                  </div>
                  {/* Tooltip arrow */}
                  <div className={`absolute left-1/2 transform -translate-x-1/2 -bottom-1 w-2 h-2 rotate-45 ${
                    isDark ? 'bg-gray-800' : 'bg-gray-700'
                  }`} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className={`absolute inset-0 bg-gradient-to-r ${isDark ? 'from-blue-600/20 to-purple-600/20' : 'from-blue-400/20 to-purple-400/20'} rounded-2xl blur-3xl`} />
        <div className={`relative bg-gradient-to-br ${isDark ? 'from-blue-950/50 to-blue-900/30' : 'from-blue-100/50 to-blue-50/30'} rounded-2xl border ${isDark ? 'border-blue-500/30' : 'border-blue-300/30'} p-8 backdrop-blur-sm`}>
          <div className="h-[400px] relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className={`text-[12.5rem] font-black select-none ${isDark ? 'text-blue-900/40' : 'text-blue-200/70'}`}>
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
          <div className="mt-4 text-center">
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Interactive 3D Logo</p>
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>Click and drag to rotate</p>
          </div>
          <p className="absolute bottom-3 right-4 text-[10px] text-gray-500">MADE WITH LOVE FOR THE TRIOE COMMUNITY</p>
        </div>
      </div>
    </div>
  );
}