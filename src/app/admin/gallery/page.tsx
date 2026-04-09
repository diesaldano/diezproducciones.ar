import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/admin/auth';
import { getAllEvents } from '@/lib/admin/store';
import Link from 'next/link';
import Image from 'next/image';

export default async function AdminGalleryPage() {
  if (!(await isAuthenticated())) {
    redirect('/admin/login');
  }

  const events = getAllEvents();
  const allImages = events.flatMap((event) =>
    event.gallery.map((img) => ({ ...img, eventName: event.name, eventId: event.id }))
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white font-montserrat">Galería</h1>
        <p className="text-zinc-500 text-sm mt-1">
          {allImages.length} {allImages.length === 1 ? 'imagen' : 'imágenes'} en total
        </p>
      </div>

      {allImages.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          <p className="text-zinc-500 text-lg">No hay imágenes en la galería</p>
          <p className="text-zinc-600 text-sm mt-2">
            Agrega imágenes desde la página de edición de cada evento
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allImages.map((img) => (
            <Link
              key={img.id}
              href={`/admin/events/${img.eventId}`}
              className="group relative aspect-square bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-amber-500/30 transition-colors"
            >
              <Image
                src={img.imageUrl}
                alt={img.alt || 'Imagen de galería'}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-sm font-medium truncate">{img.eventName}</p>
                  {img.category && (
                    <span className="text-xs text-zinc-400">{img.category}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
