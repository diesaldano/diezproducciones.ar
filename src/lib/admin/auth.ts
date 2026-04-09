import { cookies } from 'next/headers';

const ADMIN_SESSION_COOKIE = 'admin_session';

/**
 * Dev credentials — replace with real auth (e.g. NextAuth) when ready
 */
const DEV_CREDENTIALS = {
  email: 'admin@diezproducciones.ar',
  password: 'diez2026',
};

export async function validateCredentials(email: string, password: string): Promise<boolean> {
  return email === DEV_CREDENTIALS.email && password === DEV_CREDENTIALS.password;
}

export async function createSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, 'authenticated', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 8, // 8 hours
    path: '/',
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_SESSION_COOKIE);
  return session?.value === 'authenticated';
}
