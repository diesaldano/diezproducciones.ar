'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { EventData } from '@/lib/types';

type EventFormProps = {
  event?: EventData;
  mode: 'create' | 'edit';
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function EventForm({ event, mode }: EventFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: event?.name || '',
    slug: event?.slug || '',
    date: event?.date ? event.date.slice(0, 16) : '',
    location: event?.location || '',
    address: event?.address || '',
    description: event?.description || '',
    imageUrl: event?.imageUrl || '',
    priceGeneral: event?.priceGeneral ?? '',
    priceVip: event?.priceVip ?? '',
    pricePreventa: event?.pricePreventa ?? '',
    published: event?.published ?? false,
    // Event details
    doorsOpen: event?.details?.doorsOpen || '',
    showStart: event?.details?.showStart || '',
    showEnd: event?.details?.showEnd || '',
    capacity: event?.details?.capacity ?? '',
    ageRestriction: event?.details?.ageRestriction || '',
    dressCode: event?.details?.dressCode || '',
    parkingInfo: event?.details?.parkingInfo || '',
    mapUrl: event?.details?.mapUrl || '',
    notes: event?.details?.notes || '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => {
      const updated = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };
      if (name === 'name' && mode === 'create') {
        updated.slug = slugify(value);
      }
      return updated;
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok) {
        setForm((prev) => ({ ...prev, imageUrl: data.url }));
      } else {
        setError(data.error || 'Error al subir imagen');
      }
    } catch {
      setError('Error al subir imagen');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const eventPayload = {
        name: form.name,
        slug: form.slug,
        date: form.date,
        location: form.location,
        address: form.address || null,
        description: form.description || null,
        imageUrl: form.imageUrl || null,
        priceGeneral: form.priceGeneral !== '' ? Number(form.priceGeneral) : null,
        priceVip: form.priceVip !== '' ? Number(form.priceVip) : null,
        pricePreventa: form.pricePreventa !== '' ? Number(form.pricePreventa) : null,
        published: form.published,
      };

      const url =
        mode === 'create'
          ? '/api/admin/events'
          : `/api/admin/events/${event?.id}`;

      const res = await fetch(url, {
        method: mode === 'create' ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventPayload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error al guardar');
      }

      const savedEvent = await res.json();

      // Update event details if in edit mode
      if (mode === 'edit') {
        const detailsPayload = {
          action: 'update-details',
          doorsOpen: form.doorsOpen || null,
          showStart: form.showStart || null,
          showEnd: form.showEnd || null,
          capacity: form.capacity !== '' ? Number(form.capacity) : null,
          ageRestriction: form.ageRestriction || null,
          dressCode: form.dressCode || null,
          parkingInfo: form.parkingInfo || null,
          mapUrl: form.mapUrl || null,
          notes: form.notes || null,
        };

        await fetch(`/api/admin/events/${event?.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(detailsPayload),
        });
      }

      router.push(mode === 'create' ? `/admin/events/${savedEvent.id}` : '/admin/events');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    'w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors';
  const labelClass = 'block text-sm font-medium text-zinc-300 mb-2';

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white">Información Básica</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className={labelClass}>Nombre del Evento *</label>
            <input id="name" name="name" type="text" required value={form.name} onChange={handleChange} placeholder="Ej: Autos Robados en Tucumán" className={inputClass} />
          </div>
          <div>
            <label htmlFor="slug" className={labelClass}>Slug (URL) *</label>
            <input id="slug" name="slug" type="text" required value={form.slug} onChange={handleChange} placeholder="autos-robados-tucuman-2026" className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className={labelClass}>Fecha y Hora *</label>
            <input id="date" name="date" type="datetime-local" required value={form.date} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label htmlFor="location" className={labelClass}>Ubicación *</label>
            <input id="location" name="location" type="text" required value={form.location} onChange={handleChange} placeholder="Ej: Diva Rock, Tucumán" className={inputClass} />
          </div>
        </div>

        <div>
          <label htmlFor="address" className={labelClass}>Dirección</label>
          <input id="address" name="address" type="text" value={form.address} onChange={handleChange} placeholder="Ej: Av. Siempre Viva 742" className={inputClass} />
        </div>

        <div>
          <label htmlFor="description" className={labelClass}>Descripción</label>
          <textarea id="description" name="description" rows={3} value={form.description} onChange={handleChange} placeholder="Descripción del evento..." className={inputClass} />
        </div>

        <div className="flex items-center gap-3">
          <input id="published" name="published" type="checkbox" checked={form.published} onChange={handleChange} className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-amber-500 focus:ring-amber-500" />
          <label htmlFor="published" className="text-sm text-zinc-300">Publicado</label>
        </div>
      </section>

      {/* Image */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white">Imagen del Evento</h3>

        <div>
          <label htmlFor="imageFile" className={labelClass}>Subir imagen</label>
          <input id="imageFile" type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={handleImageUpload} className="text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-amber-500/10 file:text-amber-500 file:font-medium hover:file:bg-amber-500/20 file:cursor-pointer" />
        </div>

        {form.imageUrl && (
          <div className="mt-2">
            <label htmlFor="imageUrl" className={labelClass}>URL de imagen</label>
            <input id="imageUrl" name="imageUrl" type="text" value={form.imageUrl} onChange={handleChange} className={inputClass} />
          </div>
        )}
      </section>

      {/* Prices */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
        <h3 className="text-lg font-semibold text-white">Precios</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="pricePreventa" className={labelClass}>Preventa ($)</label>
            <input id="pricePreventa" name="pricePreventa" type="number" min="0" value={form.pricePreventa} onChange={handleChange} placeholder="0" className={inputClass} />
          </div>
          <div>
            <label htmlFor="priceGeneral" className={labelClass}>General ($)</label>
            <input id="priceGeneral" name="priceGeneral" type="number" min="0" value={form.priceGeneral} onChange={handleChange} placeholder="0" className={inputClass} />
          </div>
          <div>
            <label htmlFor="priceVip" className={labelClass}>VIP ($)</label>
            <input id="priceVip" name="priceVip" type="number" min="0" value={form.priceVip} onChange={handleChange} placeholder="0" className={inputClass} />
          </div>
        </div>
      </section>

      {/* Event Details (edit mode) */}
      {mode === 'edit' && (
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-white">Detalles del Evento</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="doorsOpen" className={labelClass}>Apertura de Puertas</label>
              <input id="doorsOpen" name="doorsOpen" type="text" value={form.doorsOpen} onChange={handleChange} placeholder="Ej: 20:00" className={inputClass} />
            </div>
            <div>
              <label htmlFor="showStart" className={labelClass}>Inicio del Show</label>
              <input id="showStart" name="showStart" type="text" value={form.showStart} onChange={handleChange} placeholder="Ej: 22:00" className={inputClass} />
            </div>
            <div>
              <label htmlFor="showEnd" className={labelClass}>Fin del Show</label>
              <input id="showEnd" name="showEnd" type="text" value={form.showEnd} onChange={handleChange} placeholder="Ej: 02:00" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="capacity" className={labelClass}>Capacidad</label>
              <input id="capacity" name="capacity" type="number" min="0" value={form.capacity} onChange={handleChange} placeholder="Ej: 500" className={inputClass} />
            </div>
            <div>
              <label htmlFor="ageRestriction" className={labelClass}>Restricción de Edad</label>
              <input id="ageRestriction" name="ageRestriction" type="text" value={form.ageRestriction} onChange={handleChange} placeholder="Ej: +18" className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="dressCode" className={labelClass}>Dress Code</label>
              <input id="dressCode" name="dressCode" type="text" value={form.dressCode} onChange={handleChange} placeholder="Ej: Casual" className={inputClass} />
            </div>
            <div>
              <label htmlFor="parkingInfo" className={labelClass}>Estacionamiento</label>
              <input id="parkingInfo" name="parkingInfo" type="text" value={form.parkingInfo} onChange={handleChange} placeholder="Ej: Disponible en calle lateral" className={inputClass} />
            </div>
          </div>

          <div>
            <label htmlFor="mapUrl" className={labelClass}>URL del Mapa</label>
            <input id="mapUrl" name="mapUrl" type="url" value={form.mapUrl} onChange={handleChange} placeholder="https://maps.google.com/..." className={inputClass} />
          </div>

          <div>
            <label htmlFor="notes" className={labelClass}>Notas</label>
            <textarea id="notes" name="notes" rows={3} value={form.notes} onChange={handleChange} placeholder="Notas adicionales..." className={inputClass} />
          </div>
        </section>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-black font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          {saving ? 'Guardando...' : mode === 'create' ? 'Crear Evento' : 'Guardar Cambios'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/events')}
          className="text-zinc-400 hover:text-white px-6 py-3 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
