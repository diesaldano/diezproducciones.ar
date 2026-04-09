/**
 * TypeScript types matching Prisma schema
 * Used for API responses and component props
 */

export type BandMember = {
  id: string;
  name: string;
  role: string;
  imageUrl?: string | null;
  order: number;
};

export type Band = {
  id: string;
  name: string;
  slug: string;
  bio?: string | null;
  imageUrl?: string | null;
  genre?: string | null;
  spotify?: string | null;
  youtube?: string | null;
  instagram?: string | null;
  tiktok?: string | null;
  website?: string | null;
  members: BandMember[];
};

export type GalleryImage = {
  id: string;
  title?: string | null;
  imageUrl: string;
  alt?: string | null;
  order: number;
  category?: string | null;
};

export type Drink = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  category?: string | null;
  imageUrl?: string | null;
  stock: number;
  available: boolean;
};

export type EventDetails = {
  id: string;
  doorsOpen?: string | null;
  showStart?: string | null;
  showEnd?: string | null;
  capacity?: number | null;
  ageRestriction?: string | null;
  dressCode?: string | null;
  parkingInfo?: string | null;
  mapUrl?: string | null;
  notes?: string | null;
};

export type EventData = {
  id: string;
  name: string;
  slug: string;
  date: string;
  location: string;
  address?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  priceGeneral?: number | null;
  priceVip?: number | null;
  pricePreventa?: number | null;
  published: boolean;
  bands: (Band & { isHeadliner: boolean; order: number })[];
  gallery: GalleryImage[];
  drinks: Drink[];
  details?: EventDetails | null;
};

/** Lightweight event for listing pages */
export type EventSummary = {
  id: string;
  name: string;
  slug: string;
  date: string;
  location: string;
  imageUrl?: string | null;
  priceGeneral?: number | null;
  pricePreventa?: number | null;
};
