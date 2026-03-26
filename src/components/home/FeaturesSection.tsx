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
    title: "3D Viewing",
    description: "Explore electronic components in 3D, inspect every pin, lead, and part up close in an interactive environment."
  }
];

export function FeaturesSection({ isDark }: FeaturesSectionProps) {
  return (
    <div className="w-full py-12 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
      </div>
    </div>
  );
}