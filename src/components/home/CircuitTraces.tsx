'use client';

import { useEffect, useRef } from 'react';

interface CircuitTracesProps {
  isDark: boolean;
}

export default function CircuitTraces({ isDark }: CircuitTracesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      path: { x: number; y: number }[];
      currentSegment: number;
      progress: number;
      speed: number;
      size: number;
      color: string;
      trailColor: string;
    }> = [];

    // Theme-specific colors
    const colors = isDark ? {
      background: '#172554',
      trace: '#3b82f6',
      traceDim: '#1e3a8a',
      electron: '#fbbf24',
      electronTrail: '#f59e0b',
      pad: '#f59e0b',
      padHighlight: '#fbbf24',
      glow: '#3b82f6',
    } : {
      background: '#e6f0ff',
      trace: '#2563eb',
      traceDim: '#93c5fd',
      electron: '#dc2626',
      electronTrail: '#b91c1c',
      pad: '#dc2626',
      padHighlight: '#ef4444',
      glow: '#2563eb',
    };

    // Function to get full page height
    const getPageHeight = () => {
      return Math.max(
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight,
        document.body.scrollHeight,
        document.body.offsetHeight
      );
    };

    // Function to update canvas size to cover entire page
    const updateCanvasSize = () => {
      const pageHeight = getPageHeight();
      canvas.width = window.innerWidth;
      canvas.height = pageHeight;
    };

    // Generate random circuit paths across entire page - REDUCED BY 20%
    const generateCircuitPaths = () => {
      const paths = [];
      const numPaths = 20; // Reduced from 25 to 20 (20% less)

      for (let i = 0; i < numPaths; i++) {
        // Spread paths across entire canvas height
        const startX = 50 + Math.random() * (canvas.width - 100);
        const startY = 50 + Math.random() * (canvas.height - 100);
        const path = [];
        
        let currentX = startX;
        let currentY = startY;
        const numPoints = 4 + Math.floor(Math.random() * 6); // Slightly fewer points per path
        
        for (let j = 0; j < numPoints; j++) {
          path.push({ x: currentX, y: currentY });
          
          const stepSize = 80 + Math.random() * 300;
          
          if (Math.random() > 0.5) {
            currentX += (Math.random() - 0.5) * stepSize * 2;
            path.push({ x: currentX, y: currentY });
            currentY += (Math.random() - 0.5) * stepSize;
          } else {
            currentY += (Math.random() - 0.5) * stepSize * 2;
            path.push({ x: currentX, y: currentY });
            currentX += (Math.random() - 0.5) * stepSize;
          }
          
          // Keep within bounds
          currentX = Math.max(30, Math.min(canvas.width - 30, currentX));
          currentY = Math.max(30, Math.min(canvas.height - 30, currentY));
        }
        
        path.push({ x: currentX, y: currentY });
        paths.push(path);
      }
      
      return paths;
    };

    let circuitPaths: { x: number; y: number; }[][] = [];

    // Initialize particles - also reduced proportionally
    const initParticles = () => {
      particles = [];
      circuitPaths.forEach((path) => {
        const numParticlesPerPath = 1 + Math.floor(Math.random() * 3); // Reduced from 2-4 to 1-3
        
        for (let i = 0; i < numParticlesPerPath; i++) {
          const speedVariation = Math.random();
          let speed;
          if (speedVariation < 0.3) {
            speed = 0.001 + Math.random() * 0.001;
          } else if (speedVariation < 0.7) {
            speed = 0.003 + Math.random() * 0.002;
          } else {
            speed = 0.006 + Math.random() * 0.004;
          }
          
          const size = 2 + Math.random() * 3;
          
          particles.push({
            x: path[0].x,
            y: path[0].y,
            path: [...path],
            currentSegment: 0,
            progress: Math.random(),
            speed: speed,
            size: size,
            color: colors.electron,
            trailColor: colors.electronTrail,
          });
        }
      });
    };

    // Initialize everything
    const initializeAnimation = () => {
      updateCanvasSize();
      circuitPaths = generateCircuitPaths();
      initParticles();
    };

    // Run initial setup with a slight delay to ensure DOM is ready
    setTimeout(() => {
      initializeAnimation();
    }, 100);

    const handleResize = () => {
      initializeAnimation();
    };

    window.addEventListener('resize', handleResize);
    
    // Also listen for scroll and load events
    window.addEventListener('load', initializeAnimation);
    window.addEventListener('scroll', () => {
      const newHeight = getPageHeight();
      if (Math.abs(canvas.height - newHeight) > 50) {
        initializeAnimation();
      }
    });

    const drawCircuit = () => {
      if (canvas.width === 0 || canvas.height === 0) {
        animationFrameId = requestAnimationFrame(drawCircuit);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw background
      ctx.fillStyle = colors.background;
      ctx.globalAlpha = isDark ? 0.1 : 0.3;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw circuit traces with slightly lower opacity for cleaner look
      ctx.lineWidth = isDark ? 2 : 1.5;
      ctx.shadowBlur = isDark ? 5 : 3;
      ctx.shadowColor = colors.glow;
      
      circuitPaths.forEach((path) => {
        // Slightly lower opacity for cleaner look with fewer traces
        const pathOpacity = isDark ? 0.15 + Math.random() * 0.15 : 0.2 + Math.random() * 0.2;
        
        ctx.beginPath();
        ctx.strokeStyle = colors.trace;
        ctx.globalAlpha = pathOpacity;
        ctx.moveTo(path[0].x, path[0].y);
        
        for (let i = 1; i < path.length; i++) {
          ctx.lineTo(path[i].x, path[i].y);
        }
        ctx.stroke();
        
        if (!isDark) {
          ctx.beginPath();
          ctx.strokeStyle = colors.traceDim;
          ctx.lineWidth = 1;
          ctx.globalAlpha = 0.15;
          ctx.moveTo(path[0].x, path[0].y);
          for (let i = 1; i < path.length; i++) {
            ctx.lineTo(path[i].x, path[i].y);
          }
          ctx.stroke();
        }
      });
      
      // Draw particles
      particles.forEach(p => {
        if (!p.path || p.path.length === 0) return;
        
        const start = p.path[p.currentSegment];
        const end = p.path[p.currentSegment + 1] || p.path[0];
        
        if (!start || !end) return;
        
        p.x = start.x + (end.x - start.x) * p.progress;
        p.y = start.y + (end.y - start.y) * p.progress;
        
        p.progress += p.speed;
        
        if (p.progress >= 1) {
          p.progress = 0;
          p.currentSegment = (p.currentSegment + 1) % (p.path.length - 1);
        }
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = isDark ? 15 : 10;
        ctx.globalAlpha = isDark ? 0.9 : 0.7;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(p.x - (end.x - start.x) * 0.1, 
                p.y - (end.y - start.y) * 0.1, 
                p.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = p.trailColor;
        ctx.shadowBlur = isDark ? 10 : 5;
        ctx.globalAlpha = isDark ? 0.5 : 0.3;
        ctx.fill();
      });
      
      // Draw connection points - slightly reduced opacity
      ctx.shadowBlur = isDark ? 8 : 4;
      circuitPaths.forEach(path => {
        path.forEach((point, idx) => {
          const size = (idx === 0 || idx === path.length - 1) ? 
            (isDark ? 5 : 3) : // Slightly smaller
            (isDark ? 3 : 2);
          
          ctx.beginPath();
          ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
          ctx.fillStyle = colors.pad;
          ctx.shadowColor = colors.pad;
          ctx.globalAlpha = isDark ? 0.6 : 0.4;
          ctx.fill();
          
          ctx.beginPath();
          ctx.arc(point.x, point.y, size * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = colors.padHighlight;
          ctx.globalAlpha = isDark ? 0.8 : 0.5;
          ctx.fill();
        });
      });
      
      // Light mode sparkles - reduced
      if (!isDark) {
        for (let i = 0; i < 5; i++) { // Reduced from 8 to 5
          const sparkX = Math.random() * canvas.width;
          const sparkY = Math.random() * canvas.height;
          const sparkSize = 1 + Math.random() * 2;
          
          ctx.beginPath();
          ctx.arc(sparkX, sparkY, sparkSize, 0, Math.PI * 2);
          ctx.fillStyle = '#fbbf24';
          ctx.shadowBlur = 5;
          ctx.globalAlpha = 0.2;
          ctx.fill();
        }
      }
      
      animationFrameId = requestAnimationFrame(drawCircuit);
    };

    drawCircuit();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', initializeAnimation);
      window.removeEventListener('scroll', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: isDark ? 0.6 : 0.4, // Slightly lower opacity
        transition: 'opacity 0.3s ease',
        zIndex: 0,
      }}
    />
  );
}