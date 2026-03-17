'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { useGLTF, Center } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { modelRegistry, ModelData } from '@/lib/3d/ModelLibrary';

interface ModelViewerProps {
  modelId: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  onClick?: () => void;
  hoverEffect?: boolean;
  animation?: 'float' | 'rotate' | 'pulse' | 'none';
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  showControls?: boolean;
  backgroundColor?: string;
  className?: string;
}

export function ModelViewer({
  modelId,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale,
  onClick,
  hoverEffect = false,
  animation = 'none',
  autoRotate = false,
  autoRotateSpeed = 1,
  showControls = false,
  backgroundColor = 'transparent',
  className = '',
}: ModelViewerProps) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Group>(null);
  const initialY = position[1];
  
  // Get model data directly from registry using useMemo
  const modelData = useMemo(() => {
    return modelId && modelRegistry[modelId] ? modelRegistry[modelId] : null;
  }, [modelId]);
  
  // Initialize timeOffset with a random value, but do it lazily to avoid Math.random() during render
  const timeOffset = useRef<number | null>(null);
  
  // Set timeOffset in an effect (after render)
  useEffect(() => {
    if (timeOffset.current === null) {
      timeOffset.current = Math.random() * Math.PI * 2;
    }
  }, []);

  // Load the model - only if we have a valid modelData
  const { scene } = useGLTF(modelData?.url || '');

  // Animation frame
  useFrame(({ clock }) => {
    if (!meshRef.current || !scene || timeOffset.current === null) return;

    const time = clock.getElapsedTime() + timeOffset.current;

    // Apply animations
    switch (animation) {
      case 'float':
        meshRef.current.position.y = initialY + Math.sin(time * 1.5) * 0.2;
        break;
      case 'rotate':
        meshRef.current.rotation.y += 0.01;
        break;
      case 'pulse':
        const pulseScale = 1 + Math.sin(time * 3) * 0.05;
        meshRef.current.scale.set(pulseScale, pulseScale, pulseScale);
        break;
      default:
        // No animation
        break;
    }

    // Auto-rotate if enabled
    if (autoRotate) {
      meshRef.current.rotation.y += 0.005 * autoRotateSpeed;
    }

    // Hover effect
    if (hoverEffect) {
      meshRef.current.scale.setScalar(hovered ? 1.1 : 1);
    }
  });

  if (!modelData || !scene) return null;

  const finalScale = scale || modelData.defaultScale || 1;

  return (
    <Center>
      <primitive
        ref={meshRef}
        object={scene.clone()}
        position={position}
        rotation={rotation}
        scale={finalScale}
        onClick={onClick}
        onPointerOver={() => hoverEffect && setHovered(true)}
        onPointerOut={() => hoverEffect && setHovered(false)}
      />
    </Center>
  );
}