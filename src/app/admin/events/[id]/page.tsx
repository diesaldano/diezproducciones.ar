'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import type { EventData } from '@/lib/types';
import { EventForm } from '@/components/admin/event-form';
import { GalleryManager } from '@/components/admin/gallery-manager';
// import { DrinksManager } from '@/components/admin/drinks-manager'; // Oculto - Bebidas manejadas en Preventa

type TabId = 'details' | 'gallery'; // Removido 'drinks' - Bebidas en Preventa

export default function EditEventPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;

  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabId>('details');
  const [deleting, setDeleting] = useState(false);

  const fetchEvent = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/events/${eventId}`);
      if (!res.ok) {
        router.push('/admin/events');
        return;
      }
      const data = await res.json();
      setEvent(data);
    } catch {
      router.push('/admin/events');
    } finally {
      setLoading(false);
    }
  }, [eventId, router]);

  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de eliminar este evento? Esta acción no se puede deshacer.')) return;

    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/events/${eventId}`, { method: 'DELETE' });
      if (res.ok) {
        router.push('/admin/events');
      }
    } catch {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-zinc-500">Cargando evento...</div>
      </div>
    );
  }

  if (!event) return null;

  const tabs: { id: TabId; label: string; count?: number }[] = [
    { id: 'details', label: 'Detalles' },
    { id: 'gallery', label: 'Galería', count: event.gallery.length },
    // { id: 'drinks', label: 'Bebidas', count: event.drinks.length }, // Oculto - Bebidas en Preventa
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Breadcrumb */}
      <div>
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-2">
          <Link href="/admin/events" className="hover:text-zinc-300 transition-colors">
            Eventos
          </Link>
          <span>/</span>
          <span className="text-zinc-400">{event.name}</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white font-montserrat">{event.name}</h1>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-sm text-zinc-500 hover:text-red-400 disabled:opacity-50 transition-colors"
          >
            {deleting ? 'Eliminando...' : 'Eliminar evento'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-zinc-900 border border-zinc-800 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {tab.label}
            {tab.count != null && (
              <span className="ml-1.5 text-xs opacity-60">({tab.count})</span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'details' && <EventForm event={event} mode="edit" />}

      {activeTab === 'gallery' && (
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <GalleryManager eventId={eventId} images={event.gallery} onUpdate={fetchEvent} />
        </section>
      )}

      {/* Bebidas manejadas en Preventa - Oculto del admin de landing */}
      {/* {activeTab === 'drinks' && (
        <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <DrinksManager eventId={eventId} drinks={event.drinks} onUpdate={fetchEvent} />
        </section>
      )} */}
    </div>
  );
}
