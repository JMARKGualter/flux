'use client';

import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  isDark: boolean;
}

export function FeatureCard({ icon, title, description, isDark }: FeatureCardProps) {
  return (
    <div className={`group relative ${isDark ? 'bg-gradient-to-br from-blue-950/50 to-blue-900/20' : 'bg-gradient-to-br from-white to-blue-100'} p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg border ${isDark ? 'border-blue-900/30 hover:border-blue-500/50' : 'border-blue-200/30 hover:border-blue-400/50'} transition-all hover:scale-105`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? 'from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5' : 'from-blue-400/0 to-blue-400/0 group-hover:from-blue-400/5 group-hover:to-purple-400/5'} rounded-lg transition-all`} />
      <div className="relative text-center sm:text-left">
        <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-2 sm:mb-3 md:mb-4 mx-auto sm:mx-0 group-hover:scale-110 transition-transform ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
          {icon}
        </div>
        <h3 className="text-base sm:text-lg md:text-xl mb-1 sm:mb-2 md:mb-3 font-semibold">{title}</h3>
        <p className={`text-xs sm:text-sm md:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>
      </div>
    </div>
  );
}