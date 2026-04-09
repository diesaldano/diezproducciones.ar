'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { CountdownTimer } from '@/components/countdown-timer';

gsap.registerPlugin(ScrollTrigger);

export function CountdownSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-black py-20 md:py-28 px-4 sm:px-6"
    >
      {/* Fondo con glow sutil */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 max-w-5xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-3 tracking-wider"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            CUENTA REGRESIVA
          </h2>
          <p className="text-amber-400 text-base md:text-lg font-montserrat font-semibold tracking-wide">
            24 DE ABRIL · 21:00 HS
          </p>
        </div>

        {/* Counter */}
        <CountdownTimer 
          targetDate="2026-04-24T21:00:00"
          eventName="AUTOS ROBADOS"
        />
      </div>
    </section>
  );
}