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

    // Find event by slug first to get the ID
    const event = await prisma.event.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      );
    }

    const images = await prisma.galleryImage.findMany({
      where: {
        eventId: event.id,
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
