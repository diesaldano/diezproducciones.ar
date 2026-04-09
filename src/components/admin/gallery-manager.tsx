'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { GalleryImage } from '@/lib/types';

type GalleryManagerProps = {
  eventId: string;
  images: GalleryImage[];
  onUpdate: () => void;
};

export function GalleryManager({ eventId, images, onUpdate }: GalleryManagerProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      // Upload file
      const formData = new FormData();
      formData.append('file', file);
      const uploadRes = await fetch('/api/admin/upload', { method: 'POST', body: formData });
      const uploadData = await uploadRes.json();

      if (!uploadRes.ok) {
        throw new Error(uploadData.error || 'Error al subir imagen');
      }

      // Add to event gallery
      const res = await fetch(`/api/admin/events/${eventId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add-gallery-image',
          imageUrl: uploadData.url,
          alt: file.name.replace(/\.[^.]+$/, ''),
        }),
      });

      if (!res.ok) {
        throw new Error('Error al agregar imagen a la galería');
      }

      onUpdate();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleRemove = async (imageId: string) => {
    if (!confirm('¿Eliminar esta imagen de la galería?')) return;

    try {
      const res = await fetch(`/api/admin/events/${eventId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'remove-gallery-image', imageId }),
      });

      if (!res.ok) {
        throw new Error('Error al eliminar imagen');
      }

      onUpdate();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          Galería ({images.length} {images.length === 1 ? 'imagen' : 'imágenes'})
        </h3>
        <label className="cursor-pointer bg-amber-500/10 hover:bg-amber-500/20 text-amber-500 font-medium px-4 py-2 rounded-lg text-sm transition-colors">
          {uploading ? 'Subiendo...' : '+ Agregar imagen'}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {images.length === 0 ? (
        <p className="text-zinc-500 text-sm py-8 text-center">
          No hay imágenes en la galería. Sube la primera imagen.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="group relative aspect-square bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700"
            >
              <Image
                src={img.imageUrl}
                alt={img.alt || 'Imagen de galería'}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <button
                  onClick={() => handleRemove(img.id)}
                  className="opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                >
                  Eliminar
                </button>
              </div>
              {img.category && (
                <span className="absolute top-2 left-2 bg-black/60 text-xs text-zinc-300 px-2 py-1 rounded">
                  {img.category}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
