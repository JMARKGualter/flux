'use client';

import React, { useState } from 'react';
import { Cpu, ChevronLeft, ChevronRight, Info, Grid, Layers, Zap, Circle, ArrowRight, Battery, Activity } from 'lucide-react';
import { getPartInfoForComponent, PartInfo } from '../../../lib/constants/partInfo';

interface PartInfoDisplayProps {
  isDark: boolean;
  selectedModel: {
    url: string;
  } | null;
  hoveredPartName?: string | null;
}

// Helper to get appropriate icon based on category
const getCategoryIcon = (category: string, className: string = "w-3 h-3") => {
  switch(category?.toLowerCase()) {
    case 'power distribution':
    case 'power':
    case 'electrical':
      return <Zap className={className} />;
    case 'terminals':
    case 'signal':
      return <ArrowRight className={className} />;
    case 'main body':
    case 'structure':
    case 'housing':
      return <Grid className={className} />;
    case 'active element':
    case 'internal':
      return <Cpu className={className} />;
    case 'markings':
    case 'identification':
      return <Info className={className} />;
    case 'optics':
      return <Circle className={className} />;
    case 'mechanical':
    case 'mounting':
      return <Layers className={className} />;
    default:
      return <Cpu className={className} />;
  }
};

export function PartInfoDisplay({ isDark, selectedModel, hoveredPartName }: PartInfoDisplayProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Get part info for the selected component
  const partItems: PartInfo[] = selectedModel 
    ? getPartInfoForComponent(selectedModel.url)
    : [];

  // Group parts by category for better organization
  const groupedParts = partItems.reduce((groups, part) => {
    const category = part.category || 'General';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(part);
    return groups;
  }, {} as Record<string, PartInfo[]>);

  const handlePrevious = () => {
    if (partItems.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? partItems.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleNext = () => {
    if (partItems.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === partItems.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToIndex = (index: number) => {
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  if (!selectedModel) {
    return (
      <div className={`rounded-lg border ${isDark ? 'bg-blue-950/30 border-blue-900/30' : 'bg-white/50 border-blue-200/30'} backdrop-blur-sm p-6 flex-1 overflow-y-auto min-h-0 flex flex-col items-center justify-center`}>
        <Cpu className={`w-12 h-12 mb-3 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
        <p className={`text-sm text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          Select a component to explore its parts
        </p>
      </div>
    );
  }

  if (partItems.length === 0) {
    return (
      <div className={`rounded-lg border ${isDark ? 'bg-blue-950/30 border-blue-900/30' : 'bg-white/50 border-blue-200/30'} backdrop-blur-sm p-6 flex-1 overflow-y-auto min-h-0 flex flex-col items-center justify-center`}>
        <Info className={`w-12 h-12 mb-3 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
        <p className={`text-sm text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          No part information available for this component yet
        </p>
      </div>
    );
  }

  const currentPart = partItems[currentIndex];

  return (
    <div className={`rounded-lg border ${isDark ? 'bg-blue-950/30 border-blue-900/30' : 'bg-white/50 border-blue-200/30'} backdrop-blur-sm p-5 flex-1 overflow-y-auto min-h-0`}>
      {/* Header with icon and counter */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-blue-500/20">
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Component Parts
          </h3>
        </div>
        {partItems.length > 1 && (
          <span className={`text-xs px-2 py-1 rounded-full ${isDark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
            {currentIndex + 1} / {partItems.length}
          </span>
        )}
      </div>

      {/* Current Part Information with animation */}
      <div className={`min-h-[140px] transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
        <div className={`p-4 rounded-lg ${isDark ? 'bg-blue-900/20' : 'bg-blue-50'}`}>
          {/* Part Name with Category Badge */}
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-sm">{currentPart.partName}</span>
            {currentPart.category && (
              <span className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${
                isDark ? 'bg-purple-900/40 text-purple-300' : 'bg-purple-100 text-purple-700'
              }`}>
                {getCategoryIcon(currentPart.category, "w-3 h-3")}
                {currentPart.category}
              </span>
            )}
          </div>
          
          {/* Description */}
          <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            {currentPart.description}
          </p>

          {/* Highlight if this part is currently hovered */}
          {hoveredPartName && hoveredPartName.toLowerCase().includes(currentPart.partName.toLowerCase()) && (
            <div className="mt-2 text-xs text-yellow-400 flex items-center gap-1">
              <span className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse"></span>
              Currently hovering over this part
            </div>
          )}
        </div>
      </div>

      {/* Quick Category Navigation */}
      {Object.keys(groupedParts).length > 1 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {Object.keys(groupedParts).map((category, idx) => (
            <button
              key={category}
              onClick={() => {
                // Find first part in this category
                const firstIndex = partItems.findIndex(p => p.category === category);
                if (firstIndex !== -1) goToIndex(firstIndex);
              }}
              className={`text-[10px] px-2 py-1 rounded-full flex items-center gap-1 transition-all ${
                currentPart.category === category
                  ? isDark
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-500 text-white'
                  : isDark
                    ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {getCategoryIcon(category)}
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Navigation controls */}
      {partItems.length > 1 && (
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={handlePrevious}
            className={`p-2 rounded-lg transition-all ${
              isDark 
                ? 'hover:bg-blue-800/30 text-blue-400' 
                : 'hover:bg-blue-100 text-blue-600'
            }`}
            aria-label="Previous part"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          {/* Progress dots */}
          <div className="flex gap-1.5">
            {partItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? isDark
                      ? 'bg-blue-400 w-4'
                      : 'bg-blue-500 w-4'
                    : isDark
                      ? 'bg-gray-600 hover:bg-gray-500'
                      : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to part ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={handleNext}
            className={`p-2 rounded-lg transition-all ${
              isDark 
                ? 'hover:bg-blue-800/30 text-blue-400' 
                : 'hover:bg-blue-100 text-blue-600'
            }`}
            aria-label="Next part"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}