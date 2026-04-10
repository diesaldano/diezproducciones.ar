import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/events/[slug]
 * Returns full event data with relations (bands, gallery, details)
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const event = await prisma.event.findUnique({
      where: { slug },
      include: {
        bands: {
          include: {
            band: {
              include: {
                members: {
                  orderBy: { order: 'asc' },
                },
              },
            },
          },
          orderBy: { order: 'asc' },
        },
        gallery: {
          where: { published: true },
          orderBy: { order: 'asc' },
        },
        details: true,
        drinks: {
          where: { available: true },
          orderBy: { category: 'asc' },
        },
      },
    });

    if (!event) {
      return NextResponse.json(
        { error: 'Evento no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { error: 'Error al obtener evento' },
      { status: 500 }
    );
  }
}
