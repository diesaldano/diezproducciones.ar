'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.from(textRef.current, {
        opacity: 0,
        x: 50,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Subtle parallax
      gsap.to(imageRef.current, {
        y: 30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="py-16 md:py-24 bg-black px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div ref={textRef}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            DIEZ<br />PRODUCCIONES
          </h2>

          <div className="space-y-4 text-gray-300 text-lg" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <p className="font-semibold text-amber-500 text-xl">
              Hacemos eventos que importan.
            </p>
            <p>
              Bandas sin filtro. Bebidas sin compromisos.
            </p>
            <p className="font-semibold text-amber-500">
              Gente real. Experiencias reales.
            </p>
          </div>
        </div>

        {/* Image */}
        <div ref={imageRef} className="h-80 md:h-96 rounded-lg overflow-hidden bg-gray-900">
          <img
            src="https://images.unsplash.com/photo-1519671482677-504be0ffbc9d?w=800&q=80"
            alt="Diez Producciones"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
