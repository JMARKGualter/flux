'use client';

import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { AnimatedBackground } from './AnimatedBackground';
import { useTheme } from '@/contexts/ThemeContext';

export function Home() {
  const { isDark } = useTheme();

  return (
    <div className={`w-full ${isDark ? 'bg-black text-white' : 'bg-blue-50 text-gray-900'}`}>
      <AnimatedBackground isDark={isDark} />
      <div className="relative z-10">
        <Header />
        <HeroSection isDark={isDark} />
        <FeaturesSection isDark={isDark} />
        {/* Extra space for smooth scrolling */}
        <div className="h-16 sm:h-20"></div>
      </div>
    </div>
  );
}