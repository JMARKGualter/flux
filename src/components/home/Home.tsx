'use client';

import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { AnimatedBackground } from './AnimatedBackground';
import { useTheme } from '@/contexts/ThemeContext';

export function Home() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-blue-50 text-gray-900'} relative overflow-x-hidden overflow-y-auto`}>
      <AnimatedBackground isDark={isDark} />
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-6 py-6 sm:py-8 lg:py-12">
          <HeroSection isDark={isDark} />
          <FeaturesSection isDark={isDark} />
        </main>
      </div>
    </div>
  );
}