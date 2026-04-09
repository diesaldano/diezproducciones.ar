'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/events', label: 'Eventos', icon: '🎪' },
  { href: '/admin/gallery', label: 'Galería', icon: '🖼️' },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    window.location.href = '/admin/login';
  };

  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 min-h-screen flex flex-col">
      <div className="p-6 border-b border-zinc-800">
        <Link href="/admin" className="block">
          <h1 className="text-lg font-bold text-amber-500 font-montserrat">
            DIEZ PRODUCCIONES
          </h1>
          <p className="text-xs text-zinc-500 mt-1">Panel de Administración</p>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-zinc-800 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
        >
          <span className="text-lg">🌐</span>
          Ver sitio
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors"
        >
          <span className="text-lg">🚪</span>
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
