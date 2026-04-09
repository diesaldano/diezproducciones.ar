import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin/auth';
import {
  getEventById,
  updateEvent,
  deleteEvent,
  updateEventDetails,
  addGalleryImage,
  removeGalleryImage,
  addDrink,
  updateDrink,
  removeDrink,
} from '@/lib/admin/store';

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: NextRequest, { params }: RouteParams) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { id } = await params;
  const event = getEventById(id);
  if (!event) {
    return NextResponse.json({ error: 'Evento no encontrado' }, { status: 404 });
  }

  return NextResponse.json(event);
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const updated = updateEvent(id, body);

    if (!updated) {
      return NextResponse.json({ error: 'Evento no encontrado' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { id } = await params;
  const deleted = deleteEvent(id);

  if (!deleted) {
    return NextResponse.json({ error: 'Evento no encontrado' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await request.json();
    const { action, ...data } = body as { action: string; [key: string]: unknown };

    switch (action) {
      case 'update-details': {
        const details = updateEventDetails(id, data);
        if (!details) return NextResponse.json({ error: 'Evento no encontrado' }, { status: 404 });
        return NextResponse.json(details);
      }
      case 'add-gallery-image': {
        const image = addGalleryImage(id, data as { imageUrl: string; alt?: string; category?: string });
        if (!image) return NextResponse.json({ error: 'Evento no encontrado' }, { status: 404 });
        return NextResponse.json(image, { status: 201 });
      }
      case 'remove-gallery-image': {
        const removed = removeGalleryImage(id, data.imageId as string);
        if (!removed) return NextResponse.json({ error: 'Imagen no encontrada' }, { status: 404 });
        return NextResponse.json({ success: true });
      }
      case 'add-drink': {
        const drink = addDrink(id, data as { name: string; description?: string; price: number; category?: string; stock?: number });
        if (!drink) return NextResponse.json({ error: 'Evento no encontrado' }, { status: 404 });
        return NextResponse.json(drink, { status: 201 });
      }
      case 'update-drink': {
        const updated = updateDrink(id, data.drinkId as string, data);
        if (!updated) return NextResponse.json({ error: 'Bebida no encontrada' }, { status: 404 });
        return NextResponse.json(updated);
      }
      case 'remove-drink': {
        const removed = removeDrink(id, data.drinkId as string);
        if (!removed) return NextResponse.json({ error: 'Bebida no encontrada' }, { status: 404 });
        return NextResponse.json({ success: true });
      }
      default:
        return NextResponse.json({ error: 'Acción no válida' }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ error: 'Error del servidor' }, { status: 500 });
  }
}
