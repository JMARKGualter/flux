'use client';

import { useEffect, useState } from 'react';
import { Home } from '@/components/home/Home';
import { HomeMob } from '@/components/home/HomeMob';

export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return <HomeMob />;
  }
  
  return <Home />;
}