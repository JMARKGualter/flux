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
    <div className={`group relative ${isDark ? 'bg-gradient-to-br from-blue-950/50 to-blue-900/20' : 'bg-gradient-to-br from-white to-blue-100'} p-5 sm:p-6 lg:p-8 rounded-lg border ${isDark ? 'border-blue-900/30 hover:border-blue-500/50' : 'border-blue-200/30 hover:border-blue-400/50'} transition-all hover:scale-105`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? 'from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5' : 'from-blue-400/0 to-blue-400/0 group-hover:from-blue-400/5 group-hover:to-purple-400/5'} rounded-lg transition-all`} />
      <div className="relative text-center sm:text-left">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 mx-auto sm:mx-0 group-hover:scale-110 transition-transform ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
          {icon}
        </div>
        <h3 className="text-lg sm:text-xl mb-2 sm:mb-3 font-semibold">{title}</h3>
        <p className={`text-sm sm:text-base ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>
      </div>
    </div>
  );
}