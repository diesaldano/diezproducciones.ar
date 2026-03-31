/**
 * 🌱 SEED - Landing Data
 * 
 * Datos de ejemplo para el landing:
 * - Config global del evento
 * - Galería de imágenes
 * - Eventos (para futuros eventos adicionales)
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding landing data...');

  // SEED: Configuración global
  const config = await prisma.config.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      eventName: 'AUTOS ROBADOS',
      eventDate: new Date('2026-04-24'),
      eventTime: '22:00',
      location: 'Tucumán, Argentina',
      description:
        'Sonido crudo, sin filtro. Escena independiente que mueve. En vivo: pura energía.',
      ticketUrl: null, // Agregar cuando haya gateway de pagos
      spotify: 'https://open.spotify.com/artist/Autosrobados',
      youtube: 'https://youtube.com/@autosrobados',
      tiktok: 'https://tiktok.com/@autosrobados',
      instagram: 'https://instagram.com/autosrobados',
      primaryColor: '#000000',
      secondaryColor: '#ffffff',
    },
  });

  console.log('✅ Config:', config.eventName);

  // SEED: Imágenes de galería (ejemplo)
  const galleryImages = await Promise.all([
    prisma.galleryImage.upsert({
      where: { id: 'img-1' },
      update: {},
      create: {
        id: 'img-1',
        title: 'Banda en vivo',
        imageUrl: 'https://via.placeholder.com/1200x800?text=Banda+Vivo',
        alt: 'Autos Robados en concierto en vivo',
        order: 1,
        published: true,
      },
    }),
    prisma.galleryImage.upsert({
      where: { id: 'img-2' },
      update: {},
      create: {
        id: 'img-2',
        title: 'Público energético',
        imageUrl: 'https://via.placeholder.com/1200x800?text=Publico',
        alt: 'Público disfrutando el concierto',
        order: 2,
        published: true,
      },
    }),
    prisma.galleryImage.upsert({
      where: { id: 'img-3' },
      update: {},
      create: {
        id: 'img-3',
        title: 'Detalle de bebidas',
        imageUrl: 'https://via.placeholder.com/1200x800?text=Bebidas',
        alt: 'Bebidas frías en el evento',
        order: 3,
        published: true,
      },
    }),
    prisma.galleryImage.upsert({
      where: { id: 'img-4' },
      update: {},
      create: {
        id: 'img-4',
        title: 'Momento épico',
        imageUrl: 'https://via.placeholder.com/1200x800?text=Epico',
        alt: 'Momento épico del concierto',
        order: 4,
        published: true,
      },
    }),
  ]);

  console.log('✅ Gallery images:', galleryImages.length);

  console.log('✨ Seed completado');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });