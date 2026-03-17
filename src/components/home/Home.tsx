'use client';

import { useState } from 'react';
import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { FeaturesSection } from './FeaturesSection';
import { AnimatedBackground } from './AnimatedBackground';

export function Home() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-blue-50 text-gray-900'} relative overflow-hidden`}>
      <AnimatedBackground isDark={isDark} />
      <div className="relative z-10">
        <Header isDark={isDark} toggleTheme={toggleTheme} />
        <main className="container mx-auto px-6 py-12">
          <HeroSection isDark={isDark} />
          <FeaturesSection isDark={isDark} />
        </main>
      </div>
    </div>
  );
}