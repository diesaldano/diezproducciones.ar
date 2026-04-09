import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin/auth';
import { getAllEvents, createEvent } from '@/lib/admin/store';

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const events = getAllEvents();
  return NextResponse.json(events);
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, slug, date, location, address, description, imageUrl, priceGeneral, priceVip, pricePreventa, published } = body as {
      name: string;
      slug: string;
      date: string;
      location: string;
      address?: string;
      description?: string;
      imageUrl?: string;
      priceGeneral?: number;
      priceVip?: number;
      pricePreventa?: number;
      published?: boolean;
    };

    if (!name || !slug || !date || !location) {
      return NextResponse.json({ error: 'Nombre, slug, fecha y ubicación son requeridos' }, { status: 400 });
    }

    const event = createEvent({ name, slug, date, location, address, description, imageUrl, priceGeneral, priceVip, pricePreventa, published });
    return NextResponse.json(event, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
