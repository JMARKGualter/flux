'use client';

import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { AnimatedBackground } from './AnimatedBackground';
import { useTheme } from '@/contexts/ThemeContext';

export function HomeMob() {
  const { isDark } = useTheme();

  return (
    <div className={`w-full ${isDark ? 'bg-black text-white' : 'bg-blue-50 text-gray-900'} overflow-x-hidden overflow-y-auto`}>
      <AnimatedBackground isDark={isDark} />
      <div className="relative z-10">
        <Header />
        <HeroSection isDark={isDark} />
        <FeaturesSection isDark={isDark} />
        <div className="h-12"></div>
      </div>
    </div>
  );
}