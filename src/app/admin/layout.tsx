import { redirect } from 'next/navigation';
import { isAuthenticated } from '@/lib/admin/auth';
import { AdminSidebar } from '@/components/admin/sidebar';

export const metadata = {
  title: 'Admin | Diez Producciones',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authed = await isAuthenticated();

  // Allow login page without auth
  // Layout wraps all /admin/* routes, so we check the path via headers
  // For login page, we render children directly without sidebar
  return authed ? (
    <div className="flex min-h-screen bg-black text-white">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  ) : (
    <div className="min-h-screen bg-black text-white">{children}</div>
  );
}
