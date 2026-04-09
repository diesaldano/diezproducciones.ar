import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/admin/auth';
import { getAllEvents } from '@/lib/admin/store';
import Link from 'next/link';

export default async function AdminEventsPage() {
  if (!(await isAuthenticated())) {
    redirect('/admin/login');
  }

  const events = getAllEvents();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-montserrat">Eventos</h1>
          <p className="text-zinc-500 text-sm mt-1">
            {events.length} {events.length === 1 ? 'evento' : 'eventos'} en total
          </p>
        </div>
        <Link
          href="/admin/events/new"
          className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
        >
          + Nuevo Evento
        </Link>
      </div>

      {events.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
          <p className="text-zinc-500 text-lg">No hay eventos creados</p>
          <p className="text-zinc-600 text-sm mt-2">Crea tu primer evento para comenzar</p>
          <Link
            href="/admin/events/new"
            className="inline-block mt-4 bg-amber-500 hover:bg-amber-600 text-black font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
          >
            Crear Evento
          </Link>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wide px-6 py-4">
                  Evento
                </th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wide px-6 py-4">
                  Fecha
                </th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wide px-6 py-4">
                  Ubicación
                </th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wide px-6 py-4">
                  Estado
                </th>
                <th className="text-left text-xs font-medium text-zinc-500 uppercase tracking-wide px-6 py-4">
                  Precios
                </th>
                <th className="text-right text-xs font-medium text-zinc-500 uppercase tracking-wide px-6 py-4">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-white font-medium">{event.name}</p>
                    <p className="text-zinc-600 text-xs mt-0.5">/{event.slug}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-400">
                    {new Date(event.date).toLocaleDateString('es-AR', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-400">{event.location}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        event.published
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                          : 'bg-zinc-700/50 text-zinc-400 border border-zinc-600'
                      }`}
                    >
                      {event.published ? 'Publicado' : 'Borrador'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {event.pricePreventa != null ? (
                      <span className="text-amber-500">${event.pricePreventa.toLocaleString('es-AR')}</span>
                    ) : event.priceGeneral != null ? (
                      <span className="text-zinc-400">${event.priceGeneral.toLocaleString('es-AR')}</span>
                    ) : (
                      <span className="text-zinc-600">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/events/${event.id}`}
                      className="text-amber-500 hover:text-amber-400 text-sm font-medium transition-colors"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
