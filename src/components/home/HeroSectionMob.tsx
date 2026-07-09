'use client';

import { Zap, Headset, CircuitBoard } from 'lucide-react';
import { Suspense, useEffect } from 'react';
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
    let touchStartX = 0;
    let touchStartY = 0;
    const DRAG_THRESHOLD = 5; // pixels of movement before considered a drag

    const onPointerDown = (e: PointerEvent) => {
      mouseDownX = e.clientX;
      mouseDownY = e.clientY;
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isDragging = false;
      }
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

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const dx = e.touches[0].clientX - touchStartX;
        const dy = e.touches[0].clientY - touchStartY;
        if (Math.sqrt(dx * dx + dy * dy) > DRAG_THRESHOLD) {
          isDragging = true;
        }
      }
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

    const onTouchEnd = (e: TouchEvent) => {
      if (isDragging) return;

      const rect = gl.domElement.getBoundingClientRect();
      if (e.changedTouches.length === 1) {
        pointer.x = ((e.changedTouches[0].clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = -((e.changedTouches[0].clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(pointer, camera);
        scene.updateMatrixWorld(true);

        const intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
          window.open('https://trioe.dev/', '_blank');
        }
      }
    };

    gl.domElement.addEventListener('pointerdown', onPointerDown);
    gl.domElement.addEventListener('touchstart', onTouchStart);
    gl.domElement.addEventListener('pointermove', onPointerMove);
    gl.domElement.addEventListener('touchmove', onTouchMove);
    gl.domElement.addEventListener('click', onClick);
    gl.domElement.addEventListener('touchend', onTouchEnd);

    return () => {
      gl.domElement.removeEventListener('pointerdown', onPointerDown);
      gl.domElement.removeEventListener('touchstart', onTouchStart);
      gl.domElement.removeEventListener('pointermove', onPointerMove);
      gl.domElement.removeEventListener('touchmove', onTouchMove);
      gl.domElement.removeEventListener('click', onClick);
      gl.domElement.removeEventListener('touchend', onTouchEnd);
      gl.domElement.style.cursor = 'default';
    };
  }, [scene, camera, gl]);

  return (
    <Center>
      <primitive object={scene} scale={0.14} />
    </Center>
  );
}

interface HeroSectionMobProps {
  isDark: boolean;
}

export function HeroSectionMob({ isDark }: HeroSectionMobProps) {
  return (
    <div className="w-full py-8 sm:py-10">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col gap-6">
          {/* Text Content */}
          <div className="text-center">
            <h1 className={`text-2xl sm:text-3xl font-bold mb-3 bg-gradient-to-r ${isDark ? 'from-white via-blue-200 to-blue-400' : 'from-black via-blue-900 to-blue-600'} bg-clip-text text-transparent`}>
              Welcome to Electrop3Dia
            </h1>
            <p className={`text-sm sm:text-base ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Explore the fascinating world of 3D design, electrical engineering, and cutting-edge technology.
              Learn about circuit boards, semiconductors, and the future of electronics.
            </p>
            
            {/* Buttons */}
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

              <Link
                href="/simulate"
                className={`flex items-center justify-center gap-2 w-[240px] px-4 py-2.5 rounded-lg transition-all shadow-lg text-sm ${
                  isDark
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-emerald-500/50 hover:shadow-emerald-500/70'
                    : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-emerald-400/50 hover:shadow-emerald-400/70'
                }`}
              >
                Start 3D Simulation
                <CircuitBoard className="w-4 h-4" />
              </Link>

              <div>
                <p className={`text-xs mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Have a VR HEADSET? Click below
                </p>
                <Link
                  href="/learn/vr"
                  className={`flex items-center justify-center gap-2 w-[240px] px-4 py-2.5 rounded-lg transition-all shadow-lg ${
                    isDark
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-700 hover:from-purple-700 hover:to-indigo-800 text-white shadow-purple-500/50 hover:shadow-purple-500/70'
                      : 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white shadow-purple-400/50 hover:shadow-purple-400/70'
                  }`}
                >
                  Start Learning in VR
                  <Headset className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* 3D Model */}
          <div className="mt-4">
            <div className={`relative bg-gradient-to-br ${isDark ? 'from-blue-950/50 to-blue-900/30' : 'from-blue-100/50 to-blue-50/30'} rounded-2xl border ${isDark ? 'border-blue-500/30' : 'border-blue-300/30'} p-3 sm:p-4 backdrop-blur-sm`}>
              {/* Background Text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <span className={`text-5xl sm:text-7xl md:text-8xl font-black select-none opacity-30 ${isDark ? 'text-blue-800' : 'text-blue-300'}`}>
                  TRIOE
                </span>
              </div>

              {/* 3D Canvas */}
              <div className="w-full h-[220px] sm:h-[280px] relative z-10">
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
                    minDistance={1.2}
                    maxDistance={3.5}
                    zoomSpeed={0.8}
                  />
                  <Suspense fallback={null}>
                    <LogoModel />
                    <Preload all />
                  </Suspense>
                </Canvas>
              </div>

              <div className="relative z-10 mt-2 text-center">
                <p className={`text-[10px] sm:text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Interactive 3D Logo
                </p>
                <p className={`text-[8px] sm:text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-500'} mt-0.5`}>
                  Click and drag to rotate
                </p>
              </div>

              <p className="absolute bottom-1 right-1 text-[8px] text-gray-500 z-10">
                MADE WITH LOVE FOR THE TRIOE COMMUNITY
              </p>
              <p className="absolute bottom-1 left-1 text-[8px] text-gray-500 z-10">
                TRY CLICKING THE LOGO ;)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}