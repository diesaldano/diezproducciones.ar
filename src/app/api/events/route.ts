import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/events
 * Returns list of published events (summary)
 */
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      where: { published: true },
      select: {
        id: true,
        name: true,
        slug: true,
        date: true,
        location: true,
        priceGeneral: true,
        imageUrl: true,
      },
      orderBy: { date: 'desc' },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Error al obtener eventos' },
      { status: 500 }
    );
  }
}
