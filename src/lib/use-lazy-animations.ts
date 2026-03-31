'use client';

import { useEffect } from 'react';

/**
 * LAZY LOAD: GSAP + ScrollTrigger + Lenis
 * 
 * - Se carga dinámicamente SOLO cuando el componente monta
 * - No bloquea el render inicial
 * - Socket-safe para Turbopack
 */
export function useLazyAnimations() {
  useEffect(() => {
    let gsapLoaded = false;

    async function loadAnimationLibs() {
      if (gsapLoaded) return;
      
      try {
        // Cargar GSAP y ScrollTrigger
        const gsap = await import('gsap');
        const ScrollTrigger = await import('gsap/ScrollTrigger');
        
        gsap.default.registerPlugin(ScrollTrigger.default);
        
        // Cargar Lenis para smooth scrolling
        const { default: Lenis } = await import('lenis');
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          touchMultiplier: 2,
        });

        // Conectar Lenis con ScrollTrigger
        lenis.on('scroll', () => {
          if (gsap.default.globalTimeline?.scrollTrigger) {
            gsap.default.globalTimeline.scrollTrigger.update();
          }
        });

        // RAF loop para Lenis
        function raf(time: number) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
        gsapLoaded = true;
      } catch (error) {
        console.error('[Lazy] Error cargando librerías de animación:', error);
        // NO FALLA - la página funciona sin animations
      }
    }

    // Cargar con delay para no bloquear render
    const timer = setTimeout(loadAnimationLibs, 500);
    
    return () => clearTimeout(timer);
  }, []);
}
