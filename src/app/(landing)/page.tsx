'use client';

import { useEffect } from 'react';
import { useLazyAnimations } from '@/lib/lazy-gsap-hook';
import { HeroSection } from '@/components/landing/hero-section';
import { BandaSection } from '@/components/landing/banda-section';
import { GaleriaSection } from '@/components/landing/galeria-section';
import { BannerPreventa } from '@/components/landing/banner-preventa';
import { SobreNosotrosSection } from '@/components/landing/sobre-nosotros-section';
import { InfoEventoSection } from '@/components/landing/info-evento-section';
import { CountdownSection } from '@/components/landing/countdown-section';
import { LandingFooter } from '@/components/landing/footer';

export default function LandingPage() {
  // Lazy load GSAP and Lenis only when component mounts
  useLazyAnimations();

  useEffect(() => {
    // Basic animations setup after GSAP loads
    const setupAnimations = async () => {
      // Wait for GSAP to be available
      if ((window as any).gsap) {
        const gsap = (window as any).gsap;
        
        // Example: Fade in hero content
        gsap.from('h1, p, button', {
          duration: 0.8,
          opacity: 0,
          y: 20,
          stagger: 0.1,
          ease: 'power2.out',
        });
      }
    };

    // Small delay to ensure GSAP is loaded
    const timer = setTimeout(setupAnimations, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="w-full">
      {/* Hero Section */}
      <HeroSection />

      {/* Banda Section */}
      <BandaSection />

      {/* Galería Visual */}
      <GaleriaSection />

      {/* Banner Preventa */}
      <BannerPreventa />

      {/* Countdown Section */}
      <CountdownSection />

      {/* Sobre Nosotros */}
      <SobreNosotrosSection />

      {/* Info Evento */}
      <InfoEventoSection />

      {/* Footer */}
      <LandingFooter />
    </main>
  );
}
