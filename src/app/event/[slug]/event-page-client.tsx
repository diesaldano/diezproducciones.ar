'use client';

import { useEffect } from 'react';
import { useLazyAnimations } from '@/lib/lazy-gsap-hook';
import type { EventData } from '@/lib/types';
import {
  EventHero,
  EventBanda,
  EventGaleria,
  EventBanner,
  EventInfo,
  EventDrinks,
} from '@/components/event';
import { LandingFooter } from '@/components/landing/footer';

type EventPageClientProps = {
  event: EventData;
};

export function EventPageClient({ event }: EventPageClientProps) {
  useLazyAnimations();

  useEffect(() => {
    const setupAnimations = async () => {
      if ((window as unknown as Record<string, unknown>).gsap) {
        const gsap = (window as unknown as Record<string, unknown>).gsap as {
          from: (targets: string, vars: Record<string, unknown>) => void;
        };
        gsap.from('h1, h2, p', {
          duration: 0.8,
          opacity: 0,
          y: 20,
          stagger: 0.1,
          ease: 'power2.out',
        });
      }
    };
    const timer = setTimeout(setupAnimations, 100);
    return () => clearTimeout(timer);
  }, []);

  const headliner = event.bands.find((b) => b.isHeadliner) || event.bands[0];

  const dateStr = new Date(event.date).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    timeZone: 'America/Argentina/Buenos_Aires',
  });

  return (
    <main className="w-full">
      {/* Hero */}
      <EventHero
        eventName={event.name}
        subtitle={`${dateStr} ${event.location}.`}
        posterUrl={event.imageUrl}
        ctaHref="/checkout"
      />

      {/* Headliner band */}
      {headliner && (
        <EventBanda
          band={headliner}
          members={headliner.members}
          albumTitle={undefined}
        />
      )}

      {/* Gallery */}
      <EventGaleria images={event.gallery} />

      {/* Preventa banner */}
      <EventBanner />

      {/* Drinks */}
      <EventDrinks drinks={event.drinks} />

      {/* Event info */}
      <EventInfo
        event={event}
        contactEmails={['diezproducciones.arg@gmail.com', 'salamanca.prod.tuc@gmail.com']}
      />

      {/* Footer */}
      <LandingFooter />
    </main>
  );
}
