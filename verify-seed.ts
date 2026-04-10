import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verify() {
  try {
    const event = await prisma.event.findFirst();
    console.log('✅ Event:', event?.name || 'NO DATA');
    
    const band = await prisma.band.findFirst();
    console.log('✅ Band:', band?.name || 'NO DATA');
    
    const members = await prisma.bandMember.count();
    console.log('✅ Band Members:', members);
    
    const images = await prisma.galleryImage.count();
    console.log('✅ Gallery Images:', images);
  } catch (e) {
    console.error('❌ Error:', e);
  } finally {
    await prisma.$disconnect();
  }
}

verify();
