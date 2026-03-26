'use client';

import React, { useState } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { getTriviaForComponent, TriviaItem } from '../../../lib/constants/trivia';

interface TriviaDisplayProps {
  isDark: boolean;
  selectedModel: {
    url: string;
  } | null;
}

export function TriviaDisplay({ isDark, selectedModel }: TriviaDisplayProps) {
  const [version, setVersion] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const triviaItems: TriviaItem[] = selectedModel
    ? getTriviaForComponent(selectedModel.url, 5)
    : [];

  React.useEffect(() => {
    setVersion(prev => prev + 1);
  }, [selectedModel]);

  React.useEffect(() => {
    setCurrentIndex(0);
  }, [version]);

  const handlePrevious = () => {
    if (triviaItems.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? triviaItems.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleNext = () => {
    if (triviaItems.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === triviaItems.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToIndex = (index: number) => {
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  if (!selectedModel) {
    return (
      <div className={`rounded-lg border h-full ${isDark ? 'bg-blue-950/30 border-blue-900/30' : 'bg-white/50 border-blue-200/30'} backdrop-blur-sm p-6 flex flex-col items-center justify-center overflow-y-auto`}>
        <Sparkles className={`w-12 h-12 mb-3 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
        <p className={`text-sm text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          Select a component to discover interesting facts and trivia
        </p>
      </div>
    );
  }

  if (triviaItems.length === 0) {
    return (
      <div className={`rounded-lg border h-full ${isDark ? 'bg-blue-950/30 border-blue-900/30' : 'bg-white/50 border-blue-200/30'} backdrop-blur-sm p-6 flex flex-col items-center justify-center overflow-y-auto`}>
        <Info className={`w-12 h-12 mb-3 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
        <p className={`text-sm text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          No trivia available for this component yet
        </p>
      </div>
    );
  }

  const currentTrivia = triviaItems[currentIndex];

  return (
    <div className={`rounded-lg border h-full ${isDark ? 'bg-blue-950/30 border-blue-900/30' : 'bg-white/50 border-blue-200/30'} backdrop-blur-sm p-5 flex flex-col overflow-y-auto`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-blue-500/20 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          <h3 className="text-lg font-semibold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Fun Facts & Trivia
          </h3>
        </div>
        {triviaItems.length > 1 && (
          <span className={`text-xs px-2 py-1 rounded-full ${isDark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>
            {currentIndex + 1} / {triviaItems.length}
          </span>
        )}
      </div>

      {/* Trivia Content */}
      <div className={`flex-1 transition-opacity duration-300 ${isAnimating ? 'opacity-50' : 'opacity-100'}`}>
        <div className={`p-4 rounded-lg h-full ${isDark ? 'bg-purple-900/20' : 'bg-purple-50'}`}>
          <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
            &quot;{currentTrivia.fact}&quot;
          </p>

          {(currentTrivia.source || currentTrivia.year) && (
            <div className="mt-3 flex items-center gap-3 text-xs">
              {currentTrivia.source && (
                <span className={`${isDark ? 'text-purple-300' : 'text-purple-600'}`}>
                  Source: {currentTrivia.source}
                </span>
              )}
              {currentTrivia.year && (
                <span className={`${isDark ? 'text-purple-300' : 'text-purple-600'}`}>
                  {currentTrivia.year}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      {triviaItems.length > 1 && (
        <div className="flex items-center justify-between mt-4 flex-shrink-0">
          <button
            onClick={handlePrevious}
            className={`p-2 rounded-lg transition-all ${isDark ? 'hover:bg-blue-800/30 text-blue-400' : 'hover:bg-blue-100 text-blue-600'}`}
            aria-label="Previous trivia"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-1.5">
            {triviaItems.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? isDark ? 'bg-yellow-400 w-4' : 'bg-yellow-500 w-4'
                    : isDark ? 'bg-gray-600 hover:bg-gray-500' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to trivia ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className={`p-2 rounded-lg transition-all ${isDark ? 'hover:bg-blue-800/30 text-blue-400' : 'hover:bg-blue-100 text-blue-600'}`}
            aria-label="Next trivia"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}