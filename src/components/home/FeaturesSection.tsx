'use client';

import { Cpu, Zap, Box } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

interface FeaturesSectionProps {
  isDark: boolean;
}

const features = [
  {
    icon: <Cpu className="w-full h-full" />,
    title: "Circuit Design",
    description: "Learn the fundamentals of circuit board design, component placement, and signal routing."
  },
  {
    icon: <Zap className="w-full h-full" />,
    title: "Power Systems",
    description: "Master power distribution, voltage regulation, and energy efficiency in electronic systems."
  },
  {
    icon: <Box className="w-full h-full" />,
    title: "3D Prototyping",
    description: "Explore 3D modeling, rapid prototyping, and the integration of electronics with mechanical design."
  }
];

export function FeaturesSection({ isDark }: FeaturesSectionProps) {
  return (
    <div className="mt-16 sm:mt-24 lg:mt-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          isDark={isDark}
        />
      ))}
    </div>
  );
}