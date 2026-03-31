'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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

        <Link href="www.localhost:3001/checkout">
          <button className="bg-black hover:bg-gray-900 text-amber-400 font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 text-lg flex items-center gap-2 mx-auto">
            IR A PREVENTA
            <ArrowRight size={24} />
          </button>
        </Link>
      </div>
    </div>
  );
}
