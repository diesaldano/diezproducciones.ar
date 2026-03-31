'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Music, Radio, Smartphone } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function BandSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in on scroll
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

      // Subtle parallax on image
      gsap.to(imageRef.current, {
        y: 40,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="py-16 md:py-24 bg-slate-950 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div ref={imageRef} className="h-96 md:h-auto md:aspect-square rounded-lg overflow-hidden bg-slate-900 order-2 md:order-1">
          <img
            src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80"
            alt="Autos Robados"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text */}
        <div ref={textRef} className="order-1 md:order-2">
          <h2
            ref={headlineRef}
            className="text-4xl md:text-5xl font-bold text-slate-100 mb-6"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            AUTOS ROBADOS
          </h2>

          <div className="space-y-3 text-slate-300 text-lg mb-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            <p className="font-semibold text-amber-500">Sonido crudo, sin filtro.</p>
            <p>Escena independiente que mueve.</p>
            <p className="font-semibold text-amber-500">En vivo: pura energía.</p>
          </div>

          {/* Social Links */}
          <div
            ref={linksRef}
            className="flex gap-4"
          >
            <a
              href="#spotify"
              className="flex items-center gap-2 bg-slate-900 hover:bg-amber-600/20 text-amber-500 hover:text-amber-400 px-4 py-2 rounded transition-all duration-300 hover:scale-105"
            >
              <Music size={20} />
              <span>Spotify</span>
            </a>
            <a
              href="#youtube"
              className="flex items-center gap-2 bg-slate-900 hover:bg-amber-600/20 text-amber-500 hover:text-amber-400 px-4 py-2 rounded transition-all duration-300 hover:scale-105"
            >
              <Radio size={20} />
              <span>YouTube</span>
            </a>
            <a
              href="#tiktok"
              className="flex items-center gap-2 bg-slate-900 hover:bg-amber-600/20 text-amber-500 hover:text-amber-400 px-4 py-2 rounded transition-all duration-300 hover:scale-105"
            >
              <Smartphone size={20} />
              <span>TikTok</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
