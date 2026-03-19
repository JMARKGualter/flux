'use client';

import React from 'react';
import { Info, Cpu, Zap, Grid, Sparkles, Activity, Battery, Circle, Layers, ArrowRight, CircuitBoard, AlertTriangle, Lightbulb } from 'lucide-react';
import { componentGuides, ComponentGuide, GuideSection } from '../../../lib/constants/componentGuides';

interface ComponentGuideContainerProps {
  isDark: boolean;
  selectedModel: {
    url: string;
  } | null;
  tooltip: { text: string } | null;
}

// Icon mapping with proper typing
const getIcon = (iconName: string | undefined, className: string = "w-4 h-4"): React.ReactElement => {
  switch(iconName) {
    case 'CircuitBoard': return <CircuitBoard className={className} />;
    case 'Zap': return <Zap className={className} />;
    case 'Grid': return <Grid className={className} />;
    case 'Cpu': return <Cpu className={className} />;
    case 'Info': return <Info className={className} />;
    case 'Activity': return <Activity className={className} />;
    case 'Battery': return <Battery className={className} />;
    case 'Circle': return <Circle className={className} />;
    case 'Layers': return <Layers className={className} />;
    case 'ArrowRight': return <ArrowRight className={className} />;
    case 'Palette': return <Layers className={className} />;
    case 'Hash': return <Grid className={className} />;
    default: return <Info className={className} />;
  }
};

export function ComponentGuideContainer({ isDark, selectedModel, tooltip }: ComponentGuideContainerProps) {
  if (!selectedModel) {
    return (
      <div className={`rounded-lg border ${isDark ? 'bg-blue-950/30 border-blue-900/30' : 'bg-white/50 border-blue-200/30'} backdrop-blur-sm p-6 flex-1 overflow-y-auto min-h-0 flex flex-col items-center justify-center`}>
        <CircuitBoard className={`w-12 h-12 mb-3 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
        <p className={`text-sm text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          Select a component to view its guide
        </p>
      </div>
    );
  }

  // Get the appropriate guide for the selected component
  const guide: ComponentGuide | null = componentGuides.getGuideByUrl(selectedModel.url);

  if (!guide) {
    return (
      <div className={`rounded-lg border ${isDark ? 'bg-blue-950/30 border-blue-900/30' : 'bg-white/50 border-blue-200/30'} backdrop-blur-sm p-6 flex-1 overflow-y-auto min-h-0 flex flex-col items-center justify-center`}>
        <Lightbulb className={`w-12 h-12 mb-3 ${isDark ? 'text-gray-600' : 'text-gray-300'}`} />
        <p className={`text-sm text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
          Guide coming soon for this component
        </p>
        <p className={`text-xs text-center mt-2 ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>
          [Your colleague can add a guide for {selectedModel.url.split('/').pop()?.replace('.glb', '')}]
        </p>
      </div>
    );
  }

  return (
    <div className={`rounded-lg border ${isDark ? 'bg-blue-950/30 border-blue-900/30' : 'bg-white/50 border-blue-200/30'} backdrop-blur-sm p-5 flex-1 overflow-y-auto min-h-0`}>
      {/* Header with icon */}
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-blue-500/20">
        {getIcon(guide.icon, "w-5 h-5 text-blue-400")}
        <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          {guide.title}
        </h3>
      </div>

      {/* Main Guide Content */}
      <div className="space-y-4">
        {/* Sections */}
        {guide.sections.map((section: GuideSection, index: number) => (
          <div key={index} className={`p-3 rounded-lg ${isDark ? 'bg-blue-900/10' : 'bg-blue-50'}`}>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-1 text-blue-400">
              {getIcon(section.icon, "w-4 h-4")}
              {section.title}
            </h4>
            
            {section.type === 'list' ? (
              <ul className={`text-xs space-y-1 list-disc list-inside ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {(section.content as string[]).map((item: string, i: number) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {section.content as string}
              </p>
            )}
          </div>
        ))}

        {/* Pro Tips Section */}
        {guide.proTips && guide.proTips.length > 0 && (
          <div className={`p-3 rounded-lg ${isDark ? 'bg-green-900/10' : 'bg-green-50'}`}>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-1 text-green-400">
              <Sparkles className="w-4 h-4" />
              Pro Tips
            </h4>
            <ul className={`text-xs space-y-1 list-disc list-inside ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {guide.proTips.map((tip: string, index: number) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Common Mistakes Section */}
        {guide.commonMistakes && guide.commonMistakes.length > 0 && (
          <div className={`p-3 rounded-lg ${isDark ? 'bg-red-900/10' : 'bg-red-50'}`}>
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-1 text-red-400">
              <AlertTriangle className="w-4 h-4" />
              Common Mistakes
            </h4>
            <ul className={`text-xs space-y-1 list-disc list-inside ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {guide.commonMistakes.map((mistake: string, index: number) => (
                <li key={index}>{mistake}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Current Hover Information (if any) */}
        {tooltip && (
          <div className={`mt-4 pt-3 border-t ${isDark ? 'border-blue-900/30' : 'border-blue-200/30'}`}>
            <p className={`text-xs font-medium mb-1 ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
              Currently hovering:
            </p>
            <div className={`p-2 rounded text-xs ${isDark ? 'bg-blue-900/20 text-gray-300' : 'bg-blue-100/50 text-gray-700'}`}>
              {tooltip.text}
            </div>
          </div>
        )}
      </div>

      {/* Editable note for colleague */}
      <div className={`mt-4 pt-2 text-center text-[10px] italic ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
        [Your colleague can edit this guide in src/lib/constants/componentGuides.ts]
      </div>
    </div>
  );
}