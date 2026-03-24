'use client';

import CircuitTraces from './CircuitTraces';

interface AnimatedBackgroundProps {
  isDark: boolean;
}

export function AnimatedBackground({ isDark }: AnimatedBackgroundProps) {
  return (
    <>
      {/* Fixed background elements that cover entire page */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {/* Grid background */}
        <div className={`absolute inset-0 bg-[linear-gradient(rgba(30,58,138,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(30,58,138,0.15)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse ${isDark ? '' : 'opacity-50'}`} style={{ animationDuration: '4s' }} />
        
        {/* Glowing orbs */}
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br ${isDark ? 'from-blue-600/30 via-blue-500/20 to-transparent' : 'from-blue-400/30 via-blue-300/20 to-transparent'} rounded-full blur-3xl animate-pulse`} style={{ animationDuration: '3s' }} />
        <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr ${isDark ? 'from-purple-600/20 via-blue-600/20 to-transparent' : 'from-purple-400/20 via-blue-400/20 to-transparent'} rounded-full blur-3xl animate-pulse`} style={{ animationDuration: '5s', animationDelay: '1s' }} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r ${isDark ? 'from-blue-500/10 to-cyan-500/10' : 'from-blue-300/10 to-cyan-300/10'} rounded-full blur-3xl animate-pulse`} style={{ animationDuration: '6s', animationDelay: '2s' }} />
        
        {/* Circuit lines */}
        <div className={`absolute top-1/4 left-10 w-px h-32 bg-gradient-to-b from-transparent ${isDark ? 'via-blue-500/50' : 'via-blue-400/50'} to-transparent`} />
        <div className={`absolute top-1/4 left-10 w-32 h-px bg-gradient-to-r ${isDark ? 'from-blue-500/50' : 'from-blue-400/50'} to-transparent`} />
        <div className={`absolute bottom-1/4 right-20 w-px h-40 bg-gradient-to-b from-transparent ${isDark ? 'via-blue-500/50' : 'via-blue-400/50'} to-transparent`} />
        <div className={`absolute bottom-1/4 right-20 w-40 h-px bg-gradient-to-l ${isDark ? 'from-blue-500/50' : 'from-blue-400/50'} to-transparent`} />
        
        {/* Floating particles */}
        <div className={`absolute top-1/3 left-1/4 w-2 h-2 ${isDark ? 'bg-blue-400/50' : 'bg-blue-300/50'} rounded-full animate-ping`} style={{ animationDuration: '3s' }} />
        <div className={`absolute top-2/3 right-1/3 w-2 h-2 ${isDark ? 'bg-blue-500/50' : 'bg-blue-400/50'} rounded-full animate-ping`} style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className={`absolute bottom-1/3 left-2/3 w-2 h-2 ${isDark ? 'bg-cyan-400/50' : 'bg-cyan-300/50'} rounded-full animate-ping`} style={{ animationDuration: '5s', animationDelay: '2s' }} />
      </div>

      {/* Circuit Traces Animation */}
      <CircuitTraces isDark={isDark} />
    </>
  );
}