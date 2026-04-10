import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/admin/auth';
import { getAnalytics, getAllEvents } from '@/lib/admin/store';
import { StatCard } from '@/components/admin/stat-card';
import Link from 'next/link';

export default async function AdminDashboardPage() {
  if (!(await isAuthenticated())) {
    redirect('/admin/login');
  }

  const analytics = getAnalytics();
  const events = getAllEvents();

  const upcomingEvents = events
    .filter((e) => new Date(e.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-montserrat">Dashboard</h1>
          <p className="text-zinc-500 text-sm mt-1">Resumen general de Diez Producciones</p>
        </div>
        <Link
          href="/admin/events/new"
          className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
        >
          + Nuevo Evento
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon="🎪"
          label="Eventos"
          value={analytics.events.total}
          detail={`${analytics.events.published} publicados, ${analytics.events.draft} borradores`}
        />
        <StatCard
          icon="📅"
          label="Próximos"
          value={analytics.events.upcoming}
          detail="Eventos por venir"
        />
        <StatCard
          icon="🎸"
          label="Bandas"
          value={analytics.bands}
          detail="Artistas vinculados"
        />
        <StatCard
          icon="🖼️"
          label="Galería"
          value={analytics.gallery}
          detail="Imágenes subidas"
        />
        {/* Bebidas manejadas en Preventa - Oculto del admin */}
        {/* <StatCard
          icon="🍺"
          label="Bebidas"
          value={analytics.drinks}
          detail="Bebidas configuradas"
        /> */}
      </div>

      {/* Upcoming Events */}
      <section className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Próximos Eventos</h2>
        {upcomingEvents.length === 0 ? (
          <p className="text-zinc-500 text-sm">No hay eventos próximos.</p>
        ) : (
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <Link
                key={event.id}
                href={`/admin/events/${event.id}`}
                className="flex items-center justify-between p-4 bg-zinc-800/50 border border-zinc-700 rounded-lg hover:border-amber-500/30 transition-colors"
              >
                <div>
                  <p className="text-white font-medium">{event.name}</p>
                  <p className="text-zinc-500 text-sm">{event.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-amber-500 text-sm font-medium">
                    {new Date(event.date).toLocaleDateString('es-AR', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </p>
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${
                      event.published
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-zinc-700 text-zinc-400'
                    }`}
                  >
                    {event.published ? 'Publicado' : 'Borrador'}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
