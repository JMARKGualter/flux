'use client';

import { Canvas } from '@react-three/fiber';
import { ModelViewer } from './ModelViewer';

interface SimpleModelDisplayProps {
  modelId: string;
  width?: string | number;
  height?: string | number;
  animation?: 'float' | 'rotate' | 'pulse' | 'none';
  autoRotate?: boolean;
  className?: string;
}

export function SimpleModelDisplay({
  modelId,
  width = '100%',
  height = 300,
  animation = 'float',
  autoRotate = true,
  className = '',
}: SimpleModelDisplayProps) {
  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[-5, -5, -2]} intensity={0.4} />
        <ModelViewer
          modelId={modelId}
          animation={animation}
          autoRotate={autoRotate}
          autoRotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
}