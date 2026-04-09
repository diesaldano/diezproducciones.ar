/**
 * Configuration based on environment
 */

const PREVENTA_URLS = {
  development: 'http://localhost:3001',
  production: process.env.NEXT_PUBLIC_PREVENTA_URL || 'https://preventa.diezproducciones.ar',
  staging: process.env.NEXT_PUBLIC_PREVENTA_URL || 'https://staging-preventa.diezproducciones.ar',
};

export const config = {
  preventaUrl: PREVENTA_URLS[process.env.NODE_ENV as keyof typeof PREVENTA_URLS] || PREVENTA_URLS.production,
  heroVideoUrl: process.env.NEXT_PUBLIC_HERO_VIDEO_URL,
};
