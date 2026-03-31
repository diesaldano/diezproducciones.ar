import { useEffect } from 'react';
import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export function useLenis() {
  useEffect(() => {
    // Initialize Lenis only once
    if (typeof window !== 'undefined' && !lenisInstance) {
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 2,
      });

      // Integrate with GSAP's ScrollTrigger
      if (typeof window !== 'undefined' && (window as any).gsap) {
        const gsap = (window as any).gsap;
        gsap.registerPlugin((window as any).ScrollTrigger);
        lenisInstance.on('scroll', () => {
          if ((window as any).ScrollTrigger) {
            (window as any).ScrollTrigger.update();
          }
        });
      }

      function raf(time: number) {
        lenisInstance?.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    return () => {
      // Don't destroy on unmount - let it persist for smooth scrolling
      // Only destroy when the entire app unmounts
    };
  }, []);

  return lenisInstance;
}
