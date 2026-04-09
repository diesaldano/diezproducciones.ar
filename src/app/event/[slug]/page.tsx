import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getEventBySlug, getAllEventSlugs } from '@/lib/mock-data';
import { EventPageClient } from './event-page-client';

/**
 * ISR: Regenerate event pages every 60 seconds
 */
export const revalidate = 60;

/**
 * Generate static paths for all published events at build time
 */
export async function generateStaticParams() {
  const slugs = getAllEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * Dynamic metadata per event
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return { title: 'Evento no encontrado' };
  }

  const dateStr = new Date(event.date).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Argentina/Buenos_Aires',
  });

  return {
    title: `${event.name} — ${dateStr} | Diez Producciones`,
    description: event.description || `${event.name} en ${event.location}. ${dateStr}.`,
    openGraph: {
      title: event.name,
      description: event.description || `${event.name} en ${event.location}`,
      images: event.imageUrl ? [{ url: event.imageUrl }] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: event.name,
      description: event.description || `${event.name} en ${event.location}`,
      images: event.imageUrl ? [event.imageUrl] : [],
    },
  };
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return <EventPageClient event={event} />;
}
