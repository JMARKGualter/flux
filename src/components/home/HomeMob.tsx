'use client';

import { Header } from './Header';
import { HeroSectionMob } from './HeroSectionMob';
import { FeaturesSection } from './FeaturesSection';
import { AnimatedBackground } from './AnimatedBackground';
import { useTheme } from '@/contexts/ThemeContext';

export function HomeMob() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-blue-50 text-gray-900'} relative overflow-x-hidden overflow-y-auto`}>
      <AnimatedBackground isDark={isDark} />
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 py-6 sm:py-8">
          <HeroSectionMob isDark={isDark} />
          <FeaturesSection isDark={isDark} />
        </main>
      </div>
    </div>
  );
}