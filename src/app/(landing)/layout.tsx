'use client';

import { ReactNode } from 'react';
import { useLazyAnimations } from '@/lib/use-lazy-animations';

export default function LandingLayout({ children }: { children: ReactNode }) {
  // Lazy-load GSAP + ScrollTrigger + Lenis (sin bloquear render)
  useLazyAnimations();

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen overflow-hidden">
      {children}
    </div>
  );
}
