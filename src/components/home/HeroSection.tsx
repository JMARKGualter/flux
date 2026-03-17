'use client';

import { Zap } from 'lucide-react';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, Center, Preload } from '@react-three/drei';
import { logo2Url } from '@/lib/constants/models';

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
  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-6 pl-6">
        <h1 className={`text-5xl mb-6 bg-gradient-to-r ${
          isDark 
            ? 'from-white via-blue-200 to-blue-400' 
            : 'from-blue-900 via-blue-700 to-blue-600'
        } bg-clip-text text-transparent`}>
          Welcome to 3D workbench
        </h1>
        <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
          Explore the fascinating world of 3D design, electrical engineering, and cutting-edge technology. 
          Learn about circuit boards, semiconductors, and the future of electronics.
        </p>
        <a
          href="/learn"
          className={`inline-flex items-center gap-2 ${
            isDark 
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800' 
              : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
          } text-white px-8 py-4 rounded-lg transition-all shadow-lg ${
            isDark 
              ? 'shadow-blue-500/50 hover:shadow-blue-500/70' 
              : 'shadow-blue-600/50 hover:shadow-blue-700/70'
          }`}
        >
          Start Learning
          <Zap className="w-5 h-5" />
        </a>
      </div>

      <div className="relative">
        <div className={`absolute inset-0 bg-gradient-to-r ${
          isDark 
            ? 'from-blue-600/20 to-purple-600/20' 
            : 'from-blue-500/20 to-purple-500/20'
        } rounded-2xl blur-3xl`} />
        <div className={`relative bg-gradient-to-br ${
          isDark 
            ? 'from-blue-950/50 to-blue-900/30' 
            : 'from-blue-100/80 to-blue-50/80'
        } rounded-2xl border ${
          isDark 
            ? 'border-blue-500/30' 
            : 'border-blue-400/50'
        } p-8 backdrop-blur-sm`}>
          <div className="h-[400px] relative flex items-center justify-center">
            {/* Enhanced TRIOE text for better visibility in light mode */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className={`text-[12.5rem] font-black select-none ${
                isDark 
                  ? 'text-blue-900/40' 
                  : 'text-blue-200/90' // Increased opacity from 70 to 90
              }`}>
                TRIOE
              </span>
              {/* Add a subtle shadow/outline for light mode */}
              {!isDark && (
                <span className="absolute text-[12.5rem] font-black select-none text-blue-300/30 blur-sm">
                  TRIOE
                </span>
              )}
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
          <p className="absolute bottom-3 right-4 text-[10px] text-gray-500">MADE WITH LOVE FOR TRIOE COMMUNITY</p>
        </div>
      </div>
    </div>
  );
}