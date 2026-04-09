'use client';

import Image from 'next/image';
import type { Band, BandMember } from '@/lib/types';

type EventBandaProps = {
  band: Pick<Band, 'name' | 'bio' | 'imageUrl' | 'spotify' | 'youtube' | 'instagram'>;
  members: BandMember[];
  albumTitle?: string;
};

export function EventBanda({ band, members, albumTitle }: EventBandaProps) {
  return (
    <section className="w-full bg-black py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="h-96 md:h-[500px] rounded-lg overflow-hidden flex items-center justify-center relative">
            {band.imageUrl && (
              <Image
                src={band.imageUrl}
                alt={`${band.name} — Banda`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={85}
                className="object-cover"
                priority
              />
            )}
          </div>

          {/* Text */}
          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold text-white">
              {band.name.toUpperCase()}
            </h2>

            <div className="space-y-4">
              {albumTitle && (
                <p className="font-montserrat text-amber-500 font-bold text-lg">
                  &quot;{albumTitle}&quot;
                </p>
              )}
              {band.bio && (
                <p className="font-montserrat text-base text-gray-300 leading-relaxed">
                  {band.bio}
                </p>
              )}
              {members.length > 0 && (
                <div className="text-sm text-gray-400 space-y-1 pt-2">
                  {members.map((m) => (
                    <p key={m.id}>
                      <span className="text-amber-500">{m.name}</span> • {m.role}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="flex gap-6 pt-4">
              {band.spotify && (
                <a
                  href={band.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-white hover:border-amber-500 text-white hover:text-amber-500 transition-all duration-300"
                  title="Spotify"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M9 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0m4-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-1-3a1 1 0 1 0 0 2 1 1 0 0 0 0-2" fillRule="evenodd" />
                  </svg>
                </a>
              )}
              {band.youtube && (
                <a
                  href={band.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-white hover:border-amber-500 text-white hover:text-amber-500 transition-all duration-300"
                  title="YouTube"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              )}
              {band.instagram && (
                <a
                  href={band.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-white hover:border-amber-500 text-white hover:text-amber-500 transition-all duration-300"
                  title="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
