import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/events/[slug]/bands
 * Returns bands for an event with members
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

    const bandEvents = await prisma.bandEvent.findMany({
      where: { eventId },
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
    });

    if (bandEvents.length === 0) {
      return NextResponse.json(
        { error: 'No bands found for this event' },
        { status: 404 }
      );
    }

    return NextResponse.json(bandEvents);
  } catch (error) {
    console.error('Error fetching event bands:', error);
    return NextResponse.json(
      { error: 'Error al obtener bandas' },
      { status: 500 }
    );
  }
}
