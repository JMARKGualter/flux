'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Headset, Box, Info } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { XR, createXRStore, noEvents, PointerEvents } from '@react-three/xr';
import { useGLTF } from '@react-three/drei';
import { modelRegistry, ModelData } from '@/lib/3d/ModelLibrary';
import { useTheme } from '@/contexts/ThemeContext';
import { VRWorkbench } from './VRWorkbench';

// Configure Draco loader globally (same decoder as the learn page)
useGLTF.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

// XR store — this module is only ever loaded client-side (dynamic import, ssr: false)
const store = createXRStore();

export function VRExperience() {
  const { isDark } = useTheme();
  const [selectedId, setSelectedId] = useState<string>(() => {
    const keys = Object.keys(modelRegistry);
    return keys.includes('resistor') ? 'resistor' : keys[0];
  });
  const [vrSupport, setVrSupport] = useState<'checking' | 'supported' | 'unsupported'>('checking');
  const [inSession, setInSession] = useState(false);

  const modelsByCategory = useMemo(() => {
    const groups: Record<string, ModelData[]> = {};
    Object.values(modelRegistry).forEach((model) => {
      (groups[model.category] ??= []).push(model);
    });
    return groups;
  }, []);

  useEffect(() => {
    const xr = (navigator as unknown as { xr?: { isSessionSupported(mode: string): Promise<boolean> } }).xr;
    if (!xr) {
      setVrSupport('unsupported');
      return;
    }
    xr.isSessionSupported('immersive-vr')
      .then((supported) => setVrSupport(supported ? 'supported' : 'unsupported'))
      .catch(() => setVrSupport('unsupported'));
  }, []);

  useEffect(() => {
    return store.subscribe((state) => setInSession(!!state.session));
  }, []);

  const handleEnterVR = () => {
    if (inSession) {
      store.getState().session?.end();
    } else {
      store.enterVR();
    }
  };

  return (
    <div className={`h-screen w-screen ${isDark ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'} flex flex-col overflow-hidden`}>
      {/* Header */}
      <header className={`flex items-center justify-between gap-4 px-4 py-3 border-b ${isDark ? 'border-blue-900/30 bg-blue-950/30' : 'border-blue-200/30 bg-white/50'} backdrop-blur-sm z-10`}>
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/"
            className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-blue-900/40 text-gray-300' : 'hover:bg-blue-100 text-gray-700'}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Home
          </Link>
          <h1 className="text-lg font-semibold flex items-center gap-2 truncate">
            <Headset className="w-5 h-5 text-blue-400 flex-shrink-0" />
            VR Workbench
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Model picker (desktop preview convenience — the VR menu is in-scene) */}
          <label className="flex items-center gap-2 text-sm">
            <Box className="w-4 h-4 text-blue-400" />
            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className={`px-3 py-1.5 rounded-lg border text-sm max-w-[220px] ${
                isDark
                  ? 'bg-gray-900 border-blue-900/50 text-white'
                  : 'bg-white border-blue-200 text-gray-900'
              }`}
            >
              {Object.entries(modelsByCategory).map(([category, models]) => (
                <optgroup key={category} label={category.charAt(0).toUpperCase() + category.slice(1)}>
                  {models.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>

          {/* Enter / Exit VR */}
          <button
            onClick={handleEnterVR}
            disabled={vrSupport !== 'supported'}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              vrSupport === 'supported'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-500/40'
                : isDark
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Headset className="w-4 h-4" />
            {inSession ? 'Exit VR' : 'Enter VR'}
          </button>
        </div>
      </header>

      {/* VR support hint */}
      {vrSupport === 'unsupported' && (
        <div className={`flex items-center gap-2 px-4 py-2 text-xs ${isDark ? 'bg-yellow-900/20 text-yellow-300' : 'bg-yellow-50 text-yellow-700'}`}>
          <Info className="w-3.5 h-3.5 flex-shrink-0" />
          <span>
            VR is not available on this device or browser. You can still preview the workbench below —
            to enter VR, open this page in a headset browser (e.g. Meta Quest Browser).
          </span>
        </div>
      )}

      {/* 3D / XR canvas */}
      <div className="flex-1 min-h-0 relative">
        <Canvas events={noEvents} camera={{ position: [0, 1.45, 1.3], fov: 55 }}>
          <PointerEvents />
          <XR store={store}>
            <VRWorkbench
              isDark={isDark}
              selectedId={selectedId}
              onModelSelect={setSelectedId}
            />
          </XR>
        </Canvas>

        <div className="absolute bottom-4 left-4 text-xs text-gray-500 pointer-events-none">
          <p>
            {inSession
              ? 'Point your controller at the menu to pick components; aim at parts for tooltips'
              : 'Preview: drag to orbit, scroll to zoom, click panels to interact. Put on a headset and press Enter VR.'}
          </p>
        </div>
      </div>
    </div>
  );
}
