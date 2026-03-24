'use client';

import { useEffect, useState } from 'react';
import { MainPage } from '@/components/learn/MainPage';
import { MainPageMob } from '@/components/learn/MainPageMob';

export default function LearnPage() {
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
    return <MainPageMob />;
  }
  
  return <MainPage />;
}