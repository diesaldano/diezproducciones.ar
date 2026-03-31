'use client';

import { config } from '@/lib/config';
import { useEffect, useRef } from 'react';

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Intersection Observer: Play video solo cuando hero es visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            videoRef.current.play().catch(() => {
              // Fallback: autoPlay puede fallar en algunos navegadores
            });
          } else if (videoRef.current) {
            videoRef.current.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          ref={videoRef}
          muted
          loop
          className="w-full h-full object-cover"
          playsInline
          preload="none"
          poster="/fotos/foto-promo.jpg"
        >
          <source src={config.heroVideoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-4">
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold mb-6 text-white drop-shadow-lg">
          AUTOS ROBADOS <br/>EN TUCUMÁN
        </h1>
        <p className="font-montserrat text-lg sm:text-xl text-gray-200 mb-8 drop-shadow">
          24 de Abril Diva Rock.
        </p>
        <a 
          href={config.preventaUrl}
          className="inline-block bg-amber-500 hover:bg-amber-600 text-black font-montserrat font-bold py-3 px-8 rounded-lg transition-all duration-200 text-lg"
        >
          IR A PREVENTA
        </a>
      </div>
    </section>
  );
}
