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
    <div className={`group relative ${isDark ? 'bg-gradient-to-br from-blue-950/50 to-blue-900/20' : 'bg-gradient-to-br from-white to-blue-100'} p-8 rounded-lg border ${isDark ? 'border-blue-900/30 hover:border-blue-500/50' : 'border-blue-200/30 hover:border-blue-400/50'} transition-all hover:scale-105`}>
      <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? 'from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5' : 'from-blue-400/0 to-blue-400/0 group-hover:from-blue-400/5 group-hover:to-purple-400/5'} rounded-lg transition-all`} />
      <div className="relative">
        <div className={`w-12 h-12 mb-4 group-hover:scale-110 transition-transform ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
          {icon}
        </div>
        <h3 className="text-xl mb-3">{title}</h3>
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>
      </div>
    </div>
  );
}
