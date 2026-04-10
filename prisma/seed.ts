/**
 * 🌱 SEED - Landing Data
 * 
 * Datos completos para el landing AUTOS ROBADOS:
 * - Config global del evento
 * - Event: AUTOS ROBADOS EN TUCUMÁN
 * - Band: AUTOS ROBADOS con 4 integrantes
 * - EventDetails: ubicación, horarios, capacidad
 * - GalleryImages: 6 fotos reales del landing
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding complete landing data...\n');

  // 1️⃣ SEED: Configuración global
  const config = await prisma.config.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      eventName: 'AUTOS ROBADOS',
      eventDate: new Date('2026-04-24T21:00:00'),
      eventTime: '21:00',
      location: 'Diva Rock, Barrio Norte - Tucumán',
      description: 'Rock and roll crudo sin concesiones. Guitarras encendidas, melodías directas y la intensidad que define a una de las bandas emergentes con mayor proyección del rock argentino.',
      ticketUrl: 'https://preventa.diezproducciones.ar',
      spotify: 'https://open.spotify.com/intl-es/artist/5mTDazgxgE8HYpzPckCwV0',
      youtube: 'https://www.youtube.com/@autosrobados',
      tiktok: 'https://tiktok.com/@autosrobados',
      instagram: 'https://instagram.com/autosrobados',
      primaryColor: '#000000',
      secondaryColor: '#ffffff',
    },
  });
  console.log('✅ Config global:', config.eventName);

  // 2️⃣ SEED: Banda
  const band = await prisma.band.upsert({
    where: { slug: 'autos-robados' },
    update: {},
    create: {
      name: 'AUTOS ROBADOS',
      slug: 'autos-robados',
      bio: 'Rock and roll crudo sin concesiones. Guitarras encendidas, melodías directas y la intensidad que define a una de las bandas emergentes con mayor proyección del rock argentino.',
      imageUrl: '/fotos/foto-promo.jpg',
      genre: 'Rock',
      spotify: 'https://open.spotify.com/intl-es/artist/5mTDazgxgE8HYpzPckCwV0',
      youtube: 'https://www.youtube.com/@autosrobados',
      instagram: 'https://instagram.com/autosrobados',
      tiktok: null,
      website: null,
      published: true,
    },
  });
  console.log('✅ Band:', band.name);

  // 3️⃣ SEED: Integrantes de la banda
  const members = await Promise.all([
    prisma.bandMember.upsert({
      where: { id: 'member-1-autos' },
      update: {},
      create: {
        id: 'member-1-autos',
        name: 'Federico Soto',
        role: 'voz y guitarra',
        imageUrl: null,
        order: 1,
        bandId: band.id,
      },
    }),
    prisma.bandMember.upsert({
      where: { id: 'member-2-autos' },
      update: {},
      create: {
        id: 'member-2-autos',
        name: 'Lucas Ramos',
        role: 'bajo y coros',
        imageUrl: null,
        order: 2,
        bandId: band.id,
      },
    }),
    prisma.bandMember.upsert({
      where: { id: 'member-3-autos' },
      update: {},
      create: {
        id: 'member-3-autos',
        name: 'Emmanuel Baldovino',
        role: 'batería',
        imageUrl: null,
        order: 3,
        bandId: band.id,
      },
    }),
    prisma.bandMember.upsert({
      where: { id: 'member-4-autos' },
      update: {},
      create: {
        id: 'member-4-autos',
        name: 'Nicolás Ruiz',
        role: 'guitarra y coros',
        imageUrl: null,
        order: 4,
        bandId: band.id,
      },
    }),
  ]);
  console.log('✅ Band members:', members.length);

  // 4️⃣ SEED: Evento AUTOS ROBADOS EN TUCUMÁN
  const event = await prisma.event.upsert({
    where: { slug: 'autos-robados-tucuman-2026' },
    update: {},
    create: {
      name: 'AUTOS ROBADOS EN TUCUMÁN',
      slug: 'autos-robados-tucuman-2026',
      date: new Date('2026-04-24T21:00:00'),
      location: 'Diva Rock, Barrio Norte',
      address: 'Rivadavia 1320',
      description: 'El evento de rock más esperado en Tucumán. AUTOS ROBADOS trae su sonido crudo y directo.',
      imageUrl: '/fotos/foto-promo.jpg',
      priceGeneral: 25000,
      priceVip: null,
      pricePreventa: 25000,
      published: true,
    },
  });
  console.log('✅ Event:', event.name);

  // 5️⃣ SEED: Detalles del evento (1:1 con Event)
  const eventDetails = await prisma.eventDetails.upsert({
    where: { eventId: event.id },
    update: {},
    create: {
      doorsOpen: '20:00',
      showStart: '21:00',
      showEnd: '23:59',
      capacity: 500,
      ageRestriction: 'ATP',
      dressCode: 'Casual rock',
      parkingInfo: 'Estacionamiento disponible en zona',
      mapUrl: 'https://maps.app.goo.gl/o2PzfRmFsu99Vna49',
      notes: 'Capacidad limitada. Boletería desde las 20:00 HS.',
      eventId: event.id,
    },
  });
  console.log('✅ Event Details:', eventDetails.id);

  // 6️⃣ SEED: Relación Banda-Evento (BandEvent)
  const bandEvent = await prisma.bandEvent.upsert({
    where: {
      bandId_eventId: {
        bandId: band.id,
        eventId: event.id,
      },
    },
    update: {},
    create: {
      bandId: band.id,
      eventId: event.id,
      order: 1,
      isHeadliner: true,
    },
  });
  console.log('✅ Band-Event relation');

  // 7️⃣ SEED: Imágenes de galería (6 reales del landing)
  const galleryImages = await Promise.all([
    prisma.galleryImage.upsert({
      where: { id: 'img-promo-main' },
      update: {},
      create: {
        id: 'img-promo-main',
        title: 'Promo Principal',
        imageUrl: '/fotos/foto-promo.jpg',
        alt: 'AUTOS ROBADOS - Imagen Promocional',
        order: 1,
        category: 'promo',
        published: true,
        eventId: event.id,
      },
    }),
    prisma.galleryImage.upsert({
      where: { id: 'img-gallery-cuatro' },
      update: {},
      create: {
        id: 'img-gallery-cuatro',
        title: 'Galería 4',
        imageUrl: '/fotos/gallery-cuatro.jpg',
        alt: 'AUTOS ROBADOS - Galería',
        order: 2,
        category: 'live',
        published: true,
        eventId: event.id,
      },
    }),
    prisma.galleryImage.upsert({
      where: { id: 'img-gallery-uno' },
      update: {},
      create: {
        id: 'img-gallery-uno',
        title: 'Galería 1',
        imageUrl: '/fotos/gallery-uno.jpg',
        alt: 'AUTOS ROBADOS - Plano General',
        order: 3,
        category: 'live',
        published: true,
        eventId: event.id,
      },
    }),
    prisma.galleryImage.upsert({
      where: { id: 'img-gallery-tres' },
      update: {},
      create: {
        id: 'img-gallery-tres',
        title: 'Galería 3',
        imageUrl: '/fotos/gallery-tres.jpg',
        alt: 'AUTOS ROBADOS - Plano General',
        order: 4,
        category: 'live',
        published: true,
        eventId: event.id,
      },
    }),
    prisma.galleryImage.upsert({
      where: { id: 'img-gallery-dos' },
      update: {},
      create: {
        id: 'img-gallery-dos',
        title: 'Galería 2',
        imageUrl: '/fotos/gallery-dos.jpg',
        alt: 'AUTOS ROBADOS - Promo',
        order: 5,
        category: 'promo',
        published: true,
        eventId: event.id,
      },
    }),
    prisma.galleryImage.upsert({
      where: { id: 'img-gallery-cinco' },
      update: {},
      create: {
        id: 'img-gallery-cinco',
        title: 'Galería 5',
        imageUrl: '/fotos/gallery-cinco.jpg',
        alt: 'AUTOS ROBADOS - Plano General',
        order: 6,
        category: 'live',
        published: true,
        eventId: event.id,
      },
    }),
  ]);
  console.log('✅ Gallery images:', galleryImages.length);

  console.log('\n✨ 🎸 Seed completado exitosamente!');
  console.log('\n📊 Resumen:');
  console.log(`   • Event: ${event.name}`);
  console.log(`   • Band: ${band.name} (${members.length} members)`);
  console.log(`   • Gallery: ${galleryImages.length} images`);
  console.log(`   • Date: ${event.date.toLocaleDateString('es-AR')}\n`);
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });