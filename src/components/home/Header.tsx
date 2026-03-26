'use client';

import { Sun, Moon } from 'lucide-react';
import { MouseEvent } from 'react';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

export function Header() {
  const { isDark, toggleTheme } = useTheme();

  const handleThemeToggle = (event: MouseEvent<HTMLButtonElement>) => {
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

    const transition = document.startViewTransition(() => {
      toggleTheme();
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`
          ],
        },
        {
          duration: 750,
          easing: 'ease-in-out',
          pseudoElement: '::view-transition-new(root)'
        }
      );
    });
  };

  return (
    <header className={`p-4 sm:p-5 md:p-6 flex justify-between items-center border-b ${isDark ? 'border-blue-900/30' : 'border-blue-200/30'} backdrop-blur-sm`}>
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Minimal CPU Icon Logo */}
        <div className="relative">
          <svg 
            width="48" 
            height="48" 
            viewBox="0 0 80 80" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
          >
            {/* Outer CPU Square */}
            <rect 
              x="12" 
              y="12" 
              width="56" 
              height="56" 
              rx="8" 
              fill={isDark ? "#1e293b" : "#f8fafc"} 
              stroke={isDark ? "#3b82f6" : "#2563eb"} 
              strokeWidth="2"
            />
            
            {/* Corner Pins - CPU Mounting Points */}
            <circle cx="20" cy="20" r="3" fill={isDark ? "#60a5fa" : "#3b82f6"} />
            <circle cx="60" cy="20" r="3" fill={isDark ? "#60a5fa" : "#3b82f6"} />
            <circle cx="20" cy="60" r="3" fill={isDark ? "#60a5fa" : "#3b82f6"} />
            <circle cx="60" cy="60" r="3" fill={isDark ? "#60a5fa" : "#3b82f6"} />
            
            {/* Pin Grid - Left Side */}
            {[28, 36, 44, 52].map((y) => (
              <rect key={`left-${y}`} x="8" y={y} width="3" height="4" rx="1" fill={isDark ? "#94a3b8" : "#475569"} />
            ))}
            {/* Pin Grid - Right Side */}
            {[28, 36, 44, 52].map((y) => (
              <rect key={`right-${y}`} x="69" y={y} width="3" height="4" rx="1" fill={isDark ? "#94a3b8" : "#475569"} />
            ))}
            {/* Pin Grid - Top Side */}
            {[28, 36, 44, 52].map((x) => (
              <rect key={`top-${x}`} x={x} y="8" width="4" height="3" rx="1" fill={isDark ? "#94a3b8" : "#475569"} />
            ))}
            {/* Pin Grid - Bottom Side */}
            {[28, 36, 44, 52].map((x) => (
              <rect key={`bottom-${x}`} x={x} y="69" width="4" height="3" rx="1" fill={isDark ? "#94a3b8" : "#475569"} />
            ))}
            
            {/* CPU Die - Center Square */}
            <rect 
              x="28" 
              y="28" 
              width="24" 
              height="24" 
              rx="4" 
              fill={isDark ? "#0f172a" : "#e2e8f0"} 
              stroke={isDark ? "#60a5fa" : "#3b82f6"} 
              strokeWidth="1.5"
            />
            
            {/* Circuit Traces - Minimal Lines */}
            <path 
              d="M40 28 L40 32 L36 32" 
              stroke={isDark ? "#60a5fa" : "#3b82f6"} 
              strokeWidth="1.5" 
              fill="none"
              strokeLinecap="round"
            />
            <path 
              d="M44 28 L44 32 L48 32" 
              stroke={isDark ? "#60a5fa" : "#3b82f6"} 
              strokeWidth="1.5" 
              fill="none"
              strokeLinecap="round"
            />
            <path 
              d="M40 52 L40 48 L36 48" 
              stroke={isDark ? "#60a5fa" : "#3b82f6"} 
              strokeWidth="1.5" 
              fill="none"
              strokeLinecap="round"
            />
            <path 
              d="M44 52 L44 48 L48 48" 
              stroke={isDark ? "#60a5fa" : "#3b82f6"} 
              strokeWidth="1.5" 
              fill="none"
              strokeLinecap="round"
            />
            
            {/* Central Processing Core */}
            <rect 
              x="38" 
              y="38" 
              width="4" 
              height="4" 
              fill={isDark ? "#fbbf24" : "#eab308"} 
              rx="1"
            />
            
            {/* Data Flow Dots */}
            <circle cx="32" cy="36" r="1.5" fill={isDark ? "#22c55e" : "#16a34a"} />
            <circle cx="48" cy="36" r="1.5" fill={isDark ? "#22c55e" : "#16a34a"} />
            <circle cx="32" cy="44" r="1.5" fill={isDark ? "#22c55e" : "#16a34a"} />
            <circle cx="48" cy="44" r="1.5" fill={isDark ? "#22c55e" : "#16a34a"} />
            <circle cx="40" cy="48" r="1.5" fill={isDark ? "#22c55e" : "#16a34a"} />
            
            {/* 3D Depth Indicator - Inner Shadow */}
            <rect 
              x="30" 
              y="30" 
              width="20" 
              height="20" 
              rx="2" 
              fill="none" 
              stroke={isDark ? "#3b82f6" : "#60a5fa"} 
              strokeWidth="1" 
              strokeDasharray="2 2"
            />
          </svg>
          
          {/* Subtle Pulse Effect */}
          <div className="absolute inset-0 animate-pulse rounded-full" style={{ animationDuration: '2s' }}>
            <div className="w-full h-full bg-blue-500/10 rounded-full blur-sm" />
          </div>
        </div>
        
        {/* Brand Name */}
        <div className="flex flex-col">
          <span className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 bg-clip-text text-transparent tracking-tight">
            Electrop3Dia
          </span>
          <span className={`text-[10px] sm:text-xs tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            3D ELECTRONICS WORKBENCH
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-3 sm:gap-4">
        <nav className="flex gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          <Link 
            href="/" 
            className={`text-sm sm:text-base font-medium ${isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors`}
          >
            Home
          </Link>
          <Link 
            href="/learn" 
            className={`text-sm sm:text-base font-medium ${isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors`}
          >
            Learn
          </Link>
        </nav>
        <button
          onClick={handleThemeToggle}
          className={`relative p-1.5 sm:p-2 rounded-lg ${isDark ? 'bg-blue-900/20 hover:bg-blue-900/30' : 'bg-blue-100 hover:bg-blue-200'} transition-all duration-300 overflow-visible`}
          aria-label="Toggle theme"
        >
          <div className="relative z-10">
            {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />}
          </div>
        </button>
      </div>
    </header>
  );
}