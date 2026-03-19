'use client';

import { Sparkles, Sun, Moon } from 'lucide-react';
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
    <header className={`p-6 flex justify-between items-center border-b ${isDark ? 'border-blue-900/30' : 'border-blue-200/30'} backdrop-blur-sm`}>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Sparkles className={`w-8 h-8 ${isDark ? 'text-blue-500' : 'text-blue-600'}`} />
          <div className="absolute inset-0 animate-pulse">
            <Sparkles className={`w-8 h-8 ${isDark ? 'text-blue-400/50' : 'text-blue-500/50'}`} />
          </div>
        </div>
        <span className="text-2xl font-semibold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
          FluxLabs
        </span>
      </div>
      <div className="flex items-center gap-4">
        <nav className="flex gap-6">
          <Link 
            href="/" 
            className={`${isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors`}
          >
            Home
          </Link>
          <Link 
            href="/learn" 
            className={`${isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'} transition-colors`}
          >
            Learn
          </Link>
        </nav>
        <button
          onClick={handleThemeToggle}
          className={`relative p-2 rounded-lg ${isDark ? 'bg-blue-900/20 hover:bg-blue-900/30' : 'bg-blue-100 hover:bg-blue-200'} transition-all duration-300 overflow-visible`}
          aria-label="Toggle theme"
        >
          <div className="relative z-10">
            {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-600" />}
          </div>
        </button>
      </div>
    </header>
  );
}