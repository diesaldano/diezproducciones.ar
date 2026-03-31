'use client';

import Image from 'next/image';

export function LandingFooter() {
  return (
    <footer className="w-full bg-black border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Logos - Horizontal aligned equally */}
        <div className="flex items-center justify-center gap-12 mb-12">
          <div className="relative w-24 h-24 flex-shrink-0">
            <Image
              src="/diezb.png"
              alt="Diez Producciones"
              width={96}
              height={96}
              quality={90}
              className="object-contain brightness-0 invert"
            />
          </div>
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-gray-700 to-transparent"></div>
          <div className="relative w-24 h-24 flex-shrink-0">
            <Image
              src="/salamancab.png"
              alt="Salamanca Producciones"
              width={96}
              height={96}
              quality={90}
              className="object-contain brightness-0 invert"
            />
          </div>
        </div>

        {/* Contact & Social */}
        <div className="grid md:grid-cols-2 gap-8 mb-12 items-center justify-items-center">
          {/* Diez Section */}
          <div className="flex flex-col items-center">
            <h4 className="font-montserrat font-bold text-white text-sm mb-3 text-center">DIEZ PRODUCCIONES</h4>
            <div className="space-y-2">
              <a
                href="https://www.instagram.com/diezproducciones.ar"
                className="flex items-center justify-center gap-2 font-montserrat text-sm text-gray-400 hover:text-amber-500 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 rounded px-2 py-1"
                aria-label="Instagram de Diez Producciones (abre en nueva pestaña)"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                </svg>
                @diezproducciones.ar
              </a>
              <a
                href="mailto:diezproducciones.arg@gmail.com"
                className="flex items-center justify-center gap-2 font-montserrat text-sm text-gray-400 hover:text-amber-500 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 rounded px-2 py-1"
                aria-label="Email: diezproducciones.arg@gmail.com"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                diezproducciones.arg@gmail.com
              </a>
            </div>
          </div>

          {/* Salamanca Section */}
          <div className="flex flex-col items-center">
            <h4 className="font-montserrat font-bold text-white text-sm mb-3 text-center">SALAMANCA PRODUCCIONES</h4>
            <div className="space-y-2">
              <a
                href="https://www.instagram.com/salamanca.prod/"
                className="flex items-center justify-center gap-2 font-montserrat text-sm text-gray-400 hover:text-amber-500 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 rounded px-2 py-1"
                aria-label="Instagram de Salamanca Producciones (abre en nueva pestaña)"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                </svg>
                @salamanca.prod
              </a>
              <a
                href="mailto:salamanca.prod.tuc@gmail.com"
                className="flex items-center justify-center gap-2 font-montserrat text-sm text-gray-400 hover:text-amber-500 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 rounded px-2 py-1"
                aria-label="Email: salamanca.prod.tuc@gmail.com"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                salamanca.prod.tuc@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <p className="font-montserrat text-xs text-gray-600 text-center mb-4">
            © 2026 Diez Producciones & Salamanca Producciones. Todos los derechos reservados.
          </p>
          <p className="font-montserrat text-xs text-gray-500 text-center">
            Creative Direction: <span className="text-amber-500 font-semibold">DIEZ STUDIO</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
