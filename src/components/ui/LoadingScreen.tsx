// 'use client';

// import { useEffect, useState } from 'react';
// import { Canvas } from '@react-three/fiber';
// import { useGLTF, Center, OrbitControls, Sparkles } from '@react-three/drei';
// import { logo2Url } from '@/lib/constants/models';

// // Configure Draco loader
// useGLTF.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
// useGLTF.preload(logo2Url);

// function Logo3D() {
//   const { scene } = useGLTF(logo2Url);
//   return (
//     <Center>
//       <primitive object={scene} scale={1.2} />
//     </Center>
//   );
// }

// // Generate particles once - using deterministic values for SSR
// const generateParticles = () => {
//   const seeds = [0.123, 0.456, 0.789, 0.234, 0.567, 0.891, 0.312, 0.645, 0.978, 0.135,
//                  0.246, 0.357, 0.468, 0.579, 0.681, 0.792, 0.813, 0.924, 0.147, 0.258,
//                  0.369, 0.471, 0.582, 0.693, 0.714, 0.825, 0.936, 0.159, 0.261, 0.372];
  
//   return [...Array(30)].map((_, i) => {
//     const seed = seeds[i % seeds.length];
//     return {
//       id: i,
//       size: seed * 4 + 2,
//       left: `${(seed * 100) % 100}%`,
//       top: `${((seed * 100) + 20) % 100}%`,
//       duration: `${10 + (seed * 20)}s`,
//       delay: `${(seed * 5)}s`,
//       opacity: (seed * 0.3) + 0.1,
//     };
//   });
// };

// const STATIC_PARTICLES = generateParticles();

// interface LoadingScreenProps {
//   onLoadingComplete: () => void;
// }

// export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
//   const [isExiting, setIsExiting] = useState(false);
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     // Progress animation - shorter for navigation, longer for first visit
//     const isFirstVisit = !sessionStorage.getItem('hasVisited');
//     const loadTime = isFirstVisit ? 10000 : 500;
    
//     const progressInterval = setInterval(() => {
//       setProgress(prev => {
//         const newProgress = prev + (100 / (loadTime / 100));
//         return newProgress >= 100 ? 100 : newProgress;
//       });
//     }, 100);

//     const timer = setTimeout(() => {
//       clearInterval(progressInterval);
//       setProgress(100);
      
//       setTimeout(() => {
//         setIsExiting(true);
        
//         setTimeout(() => {
//           onLoadingComplete();
//         }, 800);
//       }, 200);
//     }, loadTime);

//     return () => {
//       clearInterval(progressInterval);
//       clearTimeout(timer);
//     };
//   }, [onLoadingComplete]);

//   return (
//     <div 
//       className={`
//         fixed inset-0 z-[9999] flex flex-col items-center justify-center
//         transition-all duration-1000
//         ${isExiting ? 'scale-[2] opacity-0' : 'scale-100 opacity-100'}
//       `}
//       style={{
//         background: 'radial-gradient(circle at center, #0a0a1a 0%, #030305 100%)',
//       }}
//     >
//       {/* Animated background particles */}
//       <div className="absolute inset-0 overflow-hidden">
//         {/* Floating orbs */}
//         {STATIC_PARTICLES.map((particle) => (
//           <div
//             key={particle.id}
//             className="absolute rounded-full bg-blue-500/10 animate-float-slow"
//             style={{
//               width: `${particle.size}px`,
//               height: `${particle.size}px`,
//               left: particle.left,
//               top: particle.top,
//               animationDuration: particle.duration,
//               animationDelay: particle.delay,
//               opacity: particle.opacity,
//               filter: 'blur(1px)',
//             }}
//           />
//         ))}
        
//         {/* Pulsing circles */}
//         <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full animate-pulse-slow" />
//         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }} />
        
//         {/* Flowing lines */}
//         <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-pulse" />
//         <div className="absolute bottom-0 right-1/3 w-px h-full bg-gradient-to-t from-transparent via-purple-500/20 to-transparent animate-pulse" style={{ animationDelay: '0.5s' }} />
//       </div>

//       {/* Main content */}
//       <div className="relative z-10 flex flex-col items-center justify-center">
//         {/* Logo container */}
//         <div className="relative w-[140px] h-[140px] md:w-[160px] md:h-[160px] group">
//           {/* Glow ring animation */}
//           <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping-slow" />
//           <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-ping-slower" />
          
//           {/* 3D Canvas */}
//           <Canvas
//             camera={{ position: [0, 0, 5], fov: 45 }}
//             gl={{ 
//               powerPreference: "high-performance",
//               antialias: true,
//               alpha: true
//             }}
//             style={{ background: 'transparent' }}
//           >
//             <ambientLight intensity={1.5} />
//             <directionalLight position={[5, 5, 5]} intensity={2} />
//             <directionalLight position={[-5, 5, -2]} intensity={1} />
//             <pointLight position={[0, 3, 3]} intensity={1} color="#3b82f6" />
            
//             <Sparkles 
//               count={20}
//               scale={4}
//               size={0.5}
//               speed={0.3}
//               color="#3b82f6"
//               opacity={0.4}
//             />
            
//             <OrbitControls 
//               enableZoom={false}
//               enablePan={false}
//               enableRotate={true}
//               autoRotate={true}
//               autoRotateSpeed={3}
//             />
            
//             <Logo3D />
//           </Canvas>
//         </div>

//         {/* TRIOE text - fixed colors */}
//         <div className="mt-6 text-center relative">
//           <div className="absolute inset-0 blur-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-50 animate-pulse" />
//           <div className="relative text-2xl font-light tracking-[0.4em] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
//             TRIOE
//           </div>
//         </div>

//         {/* Loading progress - fixed colors */}
//         <div className="mt-8 w-48 h-0.5 bg-gray-800/20 rounded-full overflow-hidden">
//           <div 
//             className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
//             style={{ width: `${progress}%` }}
//           />
//         </div>
        
//         <div className="mt-2 text-xs text-gray-600">
//           {Math.round(progress)}%
//         </div>
//       </div>

//       {/* Exit circle effect */}
//       {isExiting && (
//         <div className="absolute inset-0 pointer-events-none z-20">
//           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
//             <div className="relative w-[200vw] h-[200vw] animate-expand-circle">
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-3xl" />
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }