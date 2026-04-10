import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/events/[slug]/gallery
 * Returns gallery images for an event
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Find event by slug to get the ID
    let eventId: string;
    try {
      const event = await prisma.event.findUniqueOrThrow({
        where: { slug },
        select: { id: true },
      });
      eventId = event.id;
    } catch (error) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    const images = await prisma.galleryImage.findMany({
      where: {
        eventId,
        published: true,
      },
      orderBy: { order: 'asc' },
    });

    if (images.length === 0) {
      return NextResponse.json(
        { error: 'No gallery images found' },
        { status: 404 }
      );
    }

    return NextResponse.json(images);
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return NextResponse.json(
      { error: 'Error al obtener galería' },
      { status: 500 }
    );
  }
}
