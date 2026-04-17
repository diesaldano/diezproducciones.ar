'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { config } from '@/lib/config';

gsap.registerPlugin(ScrollTrigger);

export function PreventaBannerSection() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        scrollTrigger: {
          trigger: bannerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={bannerRef}
      className="py-16 md:py-24 bg-gradient-to-r from-amber-600 to-amber-700 px-4 sm:px-6"
    >
      <div
        ref={contentRef}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
          QUIERO ENTRADAS + BEBIDAS
        </h2>

        <p className="text-white text-lg mb-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Capacidad limitada • Anticipate y compra a mejor precio
        </p>

        <a 
          href="https://norteticket.com/AUTOS-ROBADOS-EN-TUCUMAN-2026/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-black hover:bg-gray-900 text-amber-400 font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 text-lg mx-auto"
        >
          <span className="flex items-center gap-2">
            COMPRAR ENTRADAS
            <ArrowRight size={24} />
          </span>
        </a>
      </div>
    </div>
  );
}
