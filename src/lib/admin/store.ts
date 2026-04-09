import type { EventData, Band, BandMember, GalleryImage, Drink, EventDetails } from '@/lib/types';
import { mockEvents } from '@/lib/mock-data';

/**
 * In-memory admin store for CRUD operations
 * Initialized from mock data, mutations persist only during server lifetime
 * Ready for Prisma swap when DB is connected
 */

let events: EventData[] = structuredClone(mockEvents);
let nextId = 100;

function generateId(): string {
  return String(++nextId);
}

// ── Events ──────────────────────────────────────────────────────────────

export function getAllEvents(): EventData[] {
  return events;
}

export function getEventById(id: string): EventData | undefined {
  return events.find((e) => e.id === id);
}

export function createEvent(data: {
  name: string;
  slug: string;
  date: string;
  location: string;
  address?: string;
  description?: string;
  imageUrl?: string;
  priceGeneral?: number;
  priceVip?: number;
  pricePreventa?: number;
  published?: boolean;
}): EventData {
  const event: EventData = {
    id: generateId(),
    name: data.name,
    slug: data.slug,
    date: data.date,
    location: data.location,
    address: data.address || null,
    description: data.description || null,
    imageUrl: data.imageUrl || null,
    priceGeneral: data.priceGeneral ?? null,
    priceVip: data.priceVip ?? null,
    pricePreventa: data.pricePreventa ?? null,
    published: data.published ?? false,
    bands: [],
    gallery: [],
    drinks: [],
    details: null,
  };
  events.push(event);
  return event;
}

export function updateEvent(
  id: string,
  data: Partial<{
    name: string;
    slug: string;
    date: string;
    location: string;
    address: string | null;
    description: string | null;
    imageUrl: string | null;
    priceGeneral: number | null;
    priceVip: number | null;
    pricePreventa: number | null;
    published: boolean;
  }>
): EventData | undefined {
  const idx = events.findIndex((e) => e.id === id);
  if (idx === -1) return undefined;
  events[idx] = { ...events[idx], ...data };
  return events[idx];
}

export function deleteEvent(id: string): boolean {
  const len = events.length;
  events = events.filter((e) => e.id !== id);
  return events.length < len;
}

// ── Event Details ───────────────────────────────────────────────────────

export function updateEventDetails(
  eventId: string,
  data: Partial<Omit<EventDetails, 'id'>>
): EventDetails | undefined {
  const event = events.find((e) => e.id === eventId);
  if (!event) return undefined;

  if (!event.details) {
    event.details = {
      id: generateId(),
      doorsOpen: null,
      showStart: null,
      showEnd: null,
      capacity: null,
      ageRestriction: null,
      dressCode: null,
      parkingInfo: null,
      mapUrl: null,
      notes: null,
    };
  }

  event.details = { ...event.details, ...data };
  return event.details;
}

// ── Gallery ─────────────────────────────────────────────────────────────

export function addGalleryImage(
  eventId: string,
  data: { imageUrl: string; alt?: string; category?: string }
): GalleryImage | undefined {
  const event = events.find((e) => e.id === eventId);
  if (!event) return undefined;

  const image: GalleryImage = {
    id: generateId(),
    title: null,
    imageUrl: data.imageUrl,
    alt: data.alt || null,
    order: event.gallery.length,
    category: data.category || null,
  };
  event.gallery.push(image);
  return image;
}

export function removeGalleryImage(eventId: string, imageId: string): boolean {
  const event = events.find((e) => e.id === eventId);
  if (!event) return false;
  const len = event.gallery.length;
  event.gallery = event.gallery.filter((g) => g.id !== imageId);
  return event.gallery.length < len;
}

// ── Drinks ──────────────────────────────────────────────────────────────

export function addDrink(
  eventId: string,
  data: { name: string; description?: string; price: number; category?: string; stock?: number }
): Drink | undefined {
  const event = events.find((e) => e.id === eventId);
  if (!event) return undefined;

  const drink: Drink = {
    id: generateId(),
    name: data.name,
    description: data.description || null,
    price: data.price,
    category: data.category || null,
    imageUrl: null,
    stock: data.stock ?? 0,
    available: true,
  };
  event.drinks.push(drink);
  return drink;
}

export function updateDrink(
  eventId: string,
  drinkId: string,
  data: Partial<Omit<Drink, 'id'>>
): Drink | undefined {
  const event = events.find((e) => e.id === eventId);
  if (!event) return undefined;
  const idx = event.drinks.findIndex((d) => d.id === drinkId);
  if (idx === -1) return undefined;
  event.drinks[idx] = { ...event.drinks[idx], ...data };
  return event.drinks[idx];
}

export function removeDrink(eventId: string, drinkId: string): boolean {
  const event = events.find((e) => e.id === eventId);
  if (!event) return false;
  const len = event.drinks.length;
  event.drinks = event.drinks.filter((d) => d.id !== drinkId);
  return event.drinks.length < len;
}

// ── Bands ───────────────────────────────────────────────────────────────

export function addBandToEvent(
  eventId: string,
  band: Omit<Band, 'members'> & { members: BandMember[] },
  options?: { isHeadliner?: boolean }
): boolean {
  const event = events.find((e) => e.id === eventId);
  if (!event) return false;

  event.bands.push({
    ...band,
    isHeadliner: options?.isHeadliner ?? false,
    order: event.bands.length,
  });
  return true;
}

// ── Analytics ───────────────────────────────────────────────────────────

export function getAnalytics() {
  const total = events.length;
  const published = events.filter((e) => e.published).length;
  const upcoming = events.filter((e) => new Date(e.date) > new Date()).length;
  const totalBands = new Set(events.flatMap((e) => e.bands.map((b) => b.id))).size;
  const totalGalleryImages = events.reduce((sum, e) => sum + e.gallery.length, 0);
  const totalDrinks = events.reduce((sum, e) => sum + e.drinks.length, 0);

  return {
    events: { total, published, draft: total - published, upcoming },
    bands: totalBands,
    gallery: totalGalleryImages,
    drinks: totalDrinks,
  };
}
