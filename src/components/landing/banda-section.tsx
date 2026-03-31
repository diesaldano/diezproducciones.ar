'use client';

import Image from 'next/image';

export function BandaSection() {
  return (
    <section className="w-full bg-black py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image - 60% */}
          <div className="h-96 md:h-[500px] rounded-lg overflow-hidden flex items-center justify-center relative">
            <Image
              src="/fotos/foto-promo.jpg"
              alt="AUTOS ROBADOS - Banda"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={85}
              className="object-cover"
              priority
            />
          </div>

          {/* Text - 40% */}
          <div className="space-y-6">
            <h2 className="text-5xl md:text-6xl font-bold text-white">
              AUTOS ROBADOS
            </h2>
            
            <div className="space-y-4">
              <p className="font-montserrat text-lg text-gray-400">
                Presentación de "El antidoto"
              </p>
              <p className="font-montserrat text-lg text-gray-400">
                La banda que viene de agotar dos shows.
              </p>
              <p className="font-montserrat text-lg text-gray-400">
                ¡No te quedes afuera! Consegui tu entrada aqui.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-6 pt-4">
              <a
                href="https://open.spotify.com/intl-es/artist/5mTDazgxgE8HYpzPckCwV0"
                className="group inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-white hover:border-amber-500 text-white hover:text-amber-500 transition-all duration-300"
                title="Spotify"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M9 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0m4-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-1-3a1 1 0 1 0 0 2 1 1 0 0 0 0-2" fillRule="evenodd"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@autosrobados"
                className="group inline-flex items-center justify-center w-12 h-12 rounded-full border-2 border-white hover:border-amber-500 text-white hover:text-amber-500 transition-all duration-300"
                title="YouTube"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
