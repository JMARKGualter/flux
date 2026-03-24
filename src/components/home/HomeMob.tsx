'use client';

import { Header } from './Header';
import { HeroSectionMob } from './HeroSectionMob';
import { FeaturesSection } from './FeaturesSection';
import { AnimatedBackground } from './AnimatedBackground';
import { useTheme } from '@/contexts/ThemeContext';

export function HomeMob() {
  const { isDark } = useTheme();

  return (
    <div className={`w-full min-h-screen ${isDark ? 'bg-black text-white' : 'bg-blue-50 text-gray-900'} relative overflow-x-hidden overflow-y-auto`}>
      <AnimatedBackground isDark={isDark} />
      <div className="relative z-10">
        <Header />
        <HeroSectionMob isDark={isDark} />
        <FeaturesSection isDark={isDark} />
      </div>
    </div>
  );
}