import type { EventData, EventSummary } from './types';

/**
 * Mock data for development
 * Simulates DB responses until Prisma + Supabase connection is ready
 */

export const mockEvents: EventData[] = [
  {
    id: '1',
    name: 'AUTOS ROBADOS EN TUCUMÁN',
    slug: 'autos-robados-tucuman-2026',
    date: '2026-04-24T21:00:00-03:00',
    location: 'Diva Rock, Barrio Norte',
    address: 'Rivadavia 1320',
    description: 'Sonido crudo, sin filtro. Escena independiente que mueve. La banda más intensa del rock argentino llega a Tucumán.',
    imageUrl: '/fotos/foto-promo.jpg',
    priceGeneral: 25000,
    priceVip: null,
    pricePreventa: 25000,
    published: true,
    bands: [
      {
        id: '1',
        name: 'Autos Robados',
        slug: 'autos-robados',
        bio: 'Rock and roll crudo sin concesiones. Guitarras encendidas, melodías directas y la intensidad que define a una de las bandas emergentes con mayor proyección del rock argentino.',
        imageUrl: '/fotos/foto-promo.jpg',
        genre: 'Rock',
        spotify: 'https://open.spotify.com/intl-es/artist/5mTDazgxgE8HYpzPckCwV0',
        youtube: 'https://www.youtube.com/@autosrobados',
        instagram: null,
        tiktok: null,
        website: null,
        members: [
          { id: '1', name: 'Federico Soto', role: 'voz y guitarra', imageUrl: null, order: 0 },
          { id: '2', name: 'Lucas Ramos', role: 'bajo y coros', imageUrl: null, order: 1 },
          { id: '3', name: 'Emmanuel Baldovino', role: 'batería', imageUrl: null, order: 2 },
          { id: '4', name: 'Nicolás Ruiz', role: 'guitarra y coros', imageUrl: null, order: 3 },
        ],
        isHeadliner: true,
        order: 0,
      },
    ],
    gallery: [
      { id: '1', title: null, imageUrl: '/fotos/foto-promo.jpg', alt: 'AUTOS ROBADOS - Promo', order: 0, category: 'promo' },
      { id: '2', title: null, imageUrl: '/fotos/gallery-cuatro.jpg', alt: 'AUTOS ROBADOS - Promo', order: 1, category: 'promo' },
      { id: '3', title: null, imageUrl: '/fotos/gallery-uno.jpg', alt: 'AUTOS ROBADOS - Plano General', order: 2, category: 'live' },
      { id: '4', title: null, imageUrl: '/fotos/gallery-tres.jpg', alt: 'AUTOS ROBADOS - Plano General', order: 3, category: 'live' },
      { id: '5', title: null, imageUrl: '/fotos/gallery-dos.jpg', alt: 'AUTOS ROBADOS - Promo', order: 4, category: 'promo' },
      { id: '6', title: null, imageUrl: '/fotos/gallery-cinco.jpg', alt: 'AUTOS ROBADOS - Plano General', order: 5, category: 'live' },
    ],
    drinks: [
      { id: '1', name: 'Cerveza Quilmes', description: 'Lata 473ml', price: 1500, category: 'cerveza', imageUrl: null, stock: 200, available: true },
      { id: '2', name: 'Cerveza Brahma', description: 'Lata 473ml', price: 1400, category: 'cerveza', imageUrl: null, stock: 200, available: true },
      { id: '3', name: 'Fernet Branca', description: 'Botella 750ml', price: 12000, category: 'fernet', imageUrl: null, stock: 50, available: true },
      { id: '4', name: 'Coca Cola', description: 'Botella 2L', price: 2500, category: 'gaseosa', imageUrl: null, stock: 100, available: true },
    ],
    details: {
      id: '1',
      doorsOpen: '20:00',
      showStart: '21:00',
      showEnd: '23:59',
      capacity: 500,
      ageRestriction: '+18',
      dressCode: null,
      parkingInfo: null,
      mapUrl: 'https://maps.app.goo.gl/o2PzfRmFsu99Vna49',
      notes: null,
    },
  },
];

/** Get all published events (summary) */
export function getEventsSummary(): EventSummary[] {
  return mockEvents
    .filter((e) => e.published)
    .map(({ id, name, slug, date, location, imageUrl, priceGeneral, pricePreventa }) => ({
      id, name, slug, date, location, imageUrl, priceGeneral, pricePreventa,
    }));
}

/** Get a single event by slug */
export function getEventBySlug(slug: string): EventData | undefined {
  return mockEvents.find((e) => e.slug === slug && e.published);
}

/** Get all published event slugs (for generateStaticParams) */
export function getAllEventSlugs(): string[] {
  return mockEvents.filter((e) => e.published).map((e) => e.slug);
}
