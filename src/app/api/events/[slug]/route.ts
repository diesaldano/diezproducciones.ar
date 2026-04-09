import { NextResponse } from 'next/server';
import { getEventBySlug } from '@/lib/mock-data';

/**
 * GET /api/events/[slug]
 * Returns full event data by slug
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return NextResponse.json(
      { error: 'Evento no encontrado' },
      { status: 404 }
    );
  }

  return NextResponse.json(event);
}
