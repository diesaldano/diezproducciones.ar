import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/admin/auth';
import { EventForm } from '@/components/admin/event-form';
import Link from 'next/link';

export default async function NewEventPage() {
  if (!(await isAuthenticated())) {
    redirect('/admin/login');
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <div className="flex items-center gap-2 text-sm text-zinc-500 mb-2">
          <Link href="/admin/events" className="hover:text-zinc-300 transition-colors">
            Eventos
          </Link>
          <span>/</span>
          <span className="text-zinc-400">Nuevo</span>
        </div>
        <h1 className="text-2xl font-bold text-white font-montserrat">Crear Evento</h1>
      </div>

      <EventForm mode="create" />
    </div>
  );
}
