'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { modelRegistry, ModelData } from '@/lib/3d/ModelLibrary';

interface ModelContextType {
  selectedModel: ModelData | null;
  setSelectedModel: (model: ModelData | null) => void;
  recentlyViewed: ModelData[];
  addToRecentlyViewed: (modelId: string) => void;
  favorites: string[];
  toggleFavorite: (modelId: string) => void;
}

const ModelContext = createContext<ModelContextType | undefined>(undefined);

export function ModelProvider({ children }: { children: ReactNode }) {
  const [selectedModel, setSelectedModel] = useState<ModelData | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<ModelData[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const addToRecentlyViewed = (modelId: string) => {
    const model = modelRegistry[modelId];
    if (!model) return;

    setRecentlyViewed(prev => {
      const filtered = prev.filter(m => m.id !== modelId);
      return [model, ...filtered].slice(0, 10); // Keep last 10
    });
  };

  const toggleFavorite = (modelId: string) => {
    setFavorites(prev =>
      prev.includes(modelId)
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    );
  };

  return (
    <ModelContext.Provider value={{
      selectedModel,
      setSelectedModel,
      recentlyViewed,
      addToRecentlyViewed,
      favorites,
      toggleFavorite,
    }}>
      {children}
    </ModelContext.Provider>
  );
}

export function useModel() {
  const context = useContext(ModelContext);
  if (context === undefined) {
    throw new Error('useModel must be used within a ModelProvider');
  }
  return context;
}