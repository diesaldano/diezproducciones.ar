'use client';

import { ReactNode } from 'react';
import { useLenis } from '@/lib/lenis-hook';
import { GSAPSetup } from '@/components/gsap-setup';

export function LandingLayout({ children }: { children: ReactNode }) {
  useLenis();

  return (
    <>
      <GSAPSetup />
      {children}
    </>
  );
}
