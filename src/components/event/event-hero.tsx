'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

type EventHeroProps = {
  eventName: string;
  subtitle: string;
  videoUrl?: string | null;
  posterUrl?: string | null;
  ctaLabel?: string;
  ctaHref?: string;
};

export function EventHero({
  eventName,
  subtitle,
  videoUrl,
  posterUrl,
  ctaLabel = 'COMPRAR ENTRADAS',
  ctaHref = '/checkout',
}: EventHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoUrl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            videoRef.current.play().catch(() => {});
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
      observer.disconnect();
    };
  }, [videoUrl]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Video / Image Background */}
      <div className="absolute inset-0 w-full h-full">
        {videoUrl ? (
          <video
            ref={videoRef}
            muted
            loop
            className="w-full h-full object-cover"
            playsInline
            preload="none"
            poster={posterUrl || undefined}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : posterUrl ? (
          <Image
            src={posterUrl}
            alt={eventName}
            fill
            sizes="100vw"
            quality={85}
            priority
            className="object-cover"
          />
        ) : null}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-4">
        <h1
          className="text-6xl sm:text-7xl md:text-8xl font-bold mb-6 text-white drop-shadow-2xl"
          style={{ textShadow: '0 4px 6px rgba(0,0,0,0.7)' }}
        >
          {eventName}
        </h1>
        <p
          className="font-montserrat text-lg sm:text-xl text-gray-100 mb-8 drop-shadow-lg"
          style={{ textShadow: '0 2px 4px rgba(0,0,0,0.7)' }}
        >
          {subtitle}
        </p>
        <a
          href={ctaHref}
          className="inline-block bg-amber-500 hover:bg-amber-600 text-black font-montserrat font-bold py-3 px-8 rounded-lg transition-all duration-200 text-lg min-h-12 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2"
          aria-label={`${ctaLabel} — ${eventName}`}
        >
          {ctaLabel}
        </a>
      </div>
    </section>
  );
}
