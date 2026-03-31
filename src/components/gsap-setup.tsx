'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export function GSAPSetup() {
  useEffect(() => {
    // ⚡ DEFER: Cargar GSAP después del first paint
    // Evita bloquear main thread (reduce TBT)
    const timer = setTimeout(() => {
      // Global GSAP configuration
      gsap.config({
        force3D: true,
      });

      // Refresh ScrollTrigger after layout changes
      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, 300); // Defer 300ms para que el navegador pueda pintar primero

    return () => clearTimeout(timer);
  }, []);

  return null;
}
