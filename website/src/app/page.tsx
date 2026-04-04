'use client';

import { useEffect, useState } from 'react';
import Hero from '@/components/Hero';
import Disqualification from '@/components/Disqualification';
import Synthesis from '@/components/Synthesis';
import MoralityGrid from '@/components/MoralityGrid';
import MediaContainer from '@/components/MediaContainer';
import AuthorAuthority from '@/components/AuthorAuthority';
import TheFinalBeam from '@/components/TheFinalBeam';

export default function Home() {
  const [scrollRange, setScrollRange] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = currentScroll / totalScroll;
      setScrollRange(progress);
      
      // Update global CSS variables for Cumulative Pressure
      // From White (#FFFFFF) to Coal (#0F0F0F)
      const backgroundValue = Math.max(15, 255 - progress * 240);
      
      document.documentElement.style.setProperty('--current-bg', `rgb(${backgroundValue}, ${backgroundValue}, ${backgroundValue})`);
      document.documentElement.style.setProperty('--current-fg', progress > 0.6 ? '#F5F5E5' : '#000000');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen">
      <Hero />
      <Disqualification />
      <Synthesis />
      <MoralityGrid />
      <MediaContainer />
      <AuthorAuthority />
      <TheFinalBeam />
    </main>
  );
}
