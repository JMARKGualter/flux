'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { ModelViewer } from './ModelViewer';
import { modelRegistry, getAllCategories, searchModels } from '@/lib/3d/ModelLibrary';

interface ModelGalleryProps {
  onSelectModel?: (modelId: string) => void;
  isDark?: boolean;
}

export function ModelGallery({ onSelectModel, isDark = true }: ModelGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const categories = ['all', ...getAllCategories()];

  const filteredModels = searchQuery
    ? searchModels(searchQuery)
    : selectedCategory === 'all'
    ? Object.values(modelRegistry)
    : Object.values(modelRegistry).filter(m => m.category === selectedCategory);

  const handleModelClick = (modelId: string) => {
    setSelectedModel(modelId);
    if (onSelectModel) {
      onSelectModel(modelId);
    }
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className={`w-64 p-4 border-r ${isDark ? 'border-blue-900/30' : 'border-blue-200/30'}`}>
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <ul className="space-y-1">
          {categories.map(category => (
            <li
              key={category}
              className={`px-3 py-2 rounded cursor-pointer transition-colors ${
                selectedCategory === category
                  ? isDark ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'
                  : isDark ? 'hover:bg-blue-900/30' : 'hover:bg-blue-100'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </li>
          ))}
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4">
        {/* Search bar */}
        <input
          type="text"
          placeholder="Search models..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full p-2 mb-4 rounded border ${
            isDark 
              ? 'bg-blue-950/30 border-blue-900/30 text-white' 
              : 'bg-white border-blue-200/30 text-gray-900'
          }`}
        />

        {/* Model grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredModels.map(model => (
            <div
              key={model.id}
              className={`aspect-square rounded-lg border cursor-pointer transition-all ${
                selectedModel === model.id
                  ? isDark ? 'border-blue-500 ring-2 ring-blue-500' : 'border-blue-500 ring-2 ring-blue-500'
                  : isDark ? 'border-blue-900/30 hover:border-blue-500/50' : 'border-blue-200/30 hover:border-blue-400/50'
              }`}
              onClick={() => handleModelClick(model.id)}
            >
              <div className="relative w-full h-full">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                  <ambientLight intensity={0.8} />
                  <directionalLight position={[5, 5, 5]} intensity={1.5} />
                  <Grid
                    cellSize={1}
                    sectionSize={5}
                    cellThickness={0.5}
                    sectionThickness={1}
                    infiniteGrid
                    fadeDistance={10}
                    cellColor={isDark ? '#3f6a9e' : '#a0b8d0'}
                    sectionColor={isDark ? '#2a4a6e' : '#c0d0e0'}
                  />
                  <ModelViewer
                    modelId={model.id}
                    animation="rotate"
                    autoRotate
                    autoRotateSpeed={0.5}
                  />
                  <OrbitControls enableZoom={false} enablePan={false} />
                </Canvas>
                <div className={`absolute bottom-2 left-2 right-2 text-xs text-center ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {model.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}