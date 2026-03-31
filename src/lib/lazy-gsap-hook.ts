import { useEffect } from 'react';

let gsapLoaded = false;
let lenisLoaded = false;

/**
 * Lazy load GSAP with ScrollTrigger
 * Only loads when component mounts and needed for animations
 */
export function useLazyGSAP() {
  useEffect(() => {
    if (gsapLoaded) return;

    GSAPLoader.load();
    gsapLoaded = true;

    return () => {
      // Keep GSAP loaded for rest of the session
    };
  }, []);
}

/**
 * Lazy load Lenis for smooth scrolling
 * Only initializes once, persists for entire session
 */
export function useLazyLenis() {
  useEffect(() => {
    if (lenisLoaded) return;

    LenisLoader.load();
    lenisLoaded = true;

    return () => {
      // Keep Lenis loaded for rest of the session
    };
  }, []);
}

/**
 * Combined hook for both GSAP + Lenis
 */
export function useLazyAnimations() {
  useLazyGSAP();
  useLazyLenis();
}

// Loader for GSAP (with proper typing)
const GSAPLoader = {
  load: async () => {
    if (typeof window === 'undefined') return;

    try {
      // Dynamically import GSAP
      const gsap = await import('gsap');
      const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;

      // Register ScrollTrigger plugin
      const gsapModule = gsap.default;
      gsapModule.registerPlugin(ScrollTrigger);

      // Configure GSAP
      gsapModule.config({
        force3D: true,
      });

      // Make available globally for animations
      (window as any).gsap = gsapModule;
      (window as any).ScrollTrigger = ScrollTrigger;
    } catch (error) {
      console.error('[GSAP] Failed to load:', error);
    }
  },
};

// Loader for Lenis
const LenisLoader = {
  load: async () => {
    if (typeof window === 'undefined') return;

    try {
      // Dynamically import Lenis
      const Lenis = (await import('lenis')).default;

      // Initialize Lenis once
      let lenisInstance: any = (window as any).lenisInstance;

      if (!lenisInstance) {
        lenisInstance = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
        });

        // Integrate with GSAP's ScrollTrigger
        lenisInstance.on('scroll', () => {
          const ScrollTrigger = (window as any).ScrollTrigger;
          if (ScrollTrigger) {
            ScrollTrigger.update();
          }
        });

        // Animation loop
        function raf(time: number) {
          lenisInstance?.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Store globally
        (window as any).lenisInstance = lenisInstance;
      }
    } catch (error) {
      console.error('[Lenis] Failed to load:', error);
    }
  },
};

export { GSAPLoader, LenisLoader };
