'use client';

import Image from 'next/image';

export function LandingFooter() {
  return (
    <footer className="w-full bg-black border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-12 mb-12 items-center">
          {/* Logos */}
          <div className="flex items-center gap-6 justify-center md:justify-start">
            <div className="relative w-20 h-20 flex-shrink-0">
              <Image
                src="/diezb.png"
                alt="Diez Producciones"
                width={80}
                height={80}
                quality={90}
                className="object-contain brightness-0 invert"
              />
            </div>
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src="/salamancab.png"
                alt="Salamanca"
                width={64}
                height={64}
                quality={90}
                className="object-contain brightness-0 invert"
              />
            </div>
          </div>

          {/* Redes */}
          <div className="text-center md:text-left">
            <h4 className="font-montserrat font-bold text-white text-sm mb-4">REDES</h4>
            <a
              href="https://www.instagram.com/diezproducciones.ar"
              className="inline-flex items-center gap-2 font-montserrat text-sm text-gray-400 hover:text-amber-500 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
              </svg>
              @diezproducciones.ar
            </a>
          </div>

          {/* Mail */}
          <div className="text-center md:text-right">
            <h4 className="font-montserrat font-bold text-white text-sm mb-4">CONTACTO</h4>
            <a
              href="mailto:diezproducciones.arg@gmail.com"
              className="inline-flex items-center gap-2 font-montserrat text-sm text-gray-400 hover:text-amber-500 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
              diezproducciones.arg@gmail.com
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <p className="font-montserrat text-xs text-gray-600 text-center">
            © 2026 Diez Producciones. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
