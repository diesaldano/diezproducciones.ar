'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Link from 'next/link';

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !headlineRef.current || !ctaRef.current) return;

    // Initial state
    gsap.set([headlineRef.current, ctaRef.current], {
      opacity: 0,
      y: 30,
    });

    // Animate in on load
    gsap.to(headlineRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.2,
      ease: 'power3.out',
    });

    gsap.to(ctaRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.4,
      ease: 'power3.out',
    });

    // Parallax effect on scroll
    gsap.to(containerRef.current, {
      y: window.innerHeight * 0.3,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        markers: false,
      },
    });

    // Lazy load video on intersection
    const videoContainer = containerRef.current.querySelector('[data-video-container]');
    if (videoContainer) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && videoRef.current && !videoReady) {
            videoRef.current.play().catch(() => {
              // Autoplay may be blocked
            });
            setVideoReady(true);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(videoContainer);
      return () => observer.disconnect();
    }
  }, [videoReady]);

  // Respect prefers-reduced-motion
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced && videoRef.current) {
      videoRef.current.pause();
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden"
    >
      {/* Video Background Container */}
      <div 
        className="absolute inset-0 w-full h-full"
        data-video-container
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/fotos/foto-promo.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            // Fallback background image from CSS
            backgroundImage: 'url(/fotos/foto-promo.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* WebM format first (better compression) */}
          <source src="/video/hero.webm" type="video/webm" />
          
          {/* MP4 format as fallback */}
          <source src="/video/hero.mp4" type="video/mp4" />
          
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay - optimized para legibilidad */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        <h1
          ref={headlineRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 sm:mb-6 md:mb-8 tracking-wider drop-shadow-xl"
        >
          AUTOS ROBADOS
        </h1>

        <p className="font-montserrat text-base sm:text-lg md:text-xl text-slate-200 mb-6 sm:mb-8 drop-shadow-lg max-w-3xl mx-auto">
          Sonido crudo. Sin filtro. Envidia en vivo.
        </p>

        <Link href="/checkout">
          <button
            ref={ctaRef}
            className="bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-montserrat font-bold py-3 sm:py-4 px-8 sm:px-10 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 text-base sm:text-lg drop-shadow-lg"
          >
            COMPRAR BEBIDAS
          </button>
        </Link>
      </div>
    </div>
  );
}
