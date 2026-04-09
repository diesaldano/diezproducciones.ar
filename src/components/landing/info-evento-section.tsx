'use client';
import Image from 'next/image';
import { config } from '@/lib/config';

export function InfoEventoSection() {
  const info = [
    {
      icon: '📍',
      title: 'LOCACIÓN',
      content: ['Rivadavia 1320', 'Diva Rock, Barrio Norte'],
      link: 'VER EN MAPA',
      href: 'https://maps.app.goo.gl/o2PzfRmFsu99Vna49',
      target: '_blank',
    },
    {
      icon: '/icons/ticket.svg',
      title: 'FECHA',
      content: ['Viernes, 24 de abril', '21:00 HS'],
      link: 'Info',
    },
    {
      icon: '🎟️',
      title: 'ENTRADA',
      content: ['$25.000', 'Capacidad limitada'],
      link: 'COMPRAR',
      href: config.preventaUrl,
      target: '_blank',
    },
    {
      icon: '📞',
      title: 'CONTACTO',
      content: ['diezproducciones.arg@gmail.com', 'salamanca.prod.tuc@gmail.com'],
      link: 'ESCRIBIR',
      href: 'mailto:diezproducciones.arg@gmail.com?cc=salamanca.prod.tuc@gmail.com&subject=Consulta%20AUTOS%20ROBADOS%20Tucumán',
    },
  ];

  return (
    <section className="w-full bg-black py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight">
            INFORMACIÓN DEL EVENTO
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full"></div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {info.map((item, idx) => (
            <div
              key={idx}
              className="group bg-gray-900/50 backdrop-blur-sm p-8 sm:p-10 lg:p-12 rounded-lg border border-gray-800 hover:bg-gray-900 hover:border-amber-500/80 transition-all duration-300 flex flex-col h-full"
            >
              {/* Icon */}
              <div className="mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center h-20 sm:h-24 md:h-28">
                {item.icon.startsWith('/') ? (
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain"
                  />
                ) : (
                  <span className="text-5xl sm:text-6xl md:text-7xl">
                    {item.icon}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-montserrat font-semibold text-amber-500 text-sm sm:text-base md:text-lg tracking-widest mb-4 sm:mb-6 uppercase">
                {item.title}
              </h3>

              {/* Content */}
              <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 flex-grow">
                {item.content.map((line, i) => (
                  <p
                    key={i}
                    className="font-montserrat text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed break-words"
                  >
                    {line}
                  </p>
                ))}
              </div>

              {/* CTA */}
              {item.href && (
                <a
                  href={item.href}
                  target={item.target || '_self'}
                  rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                  aria-label={`${item.title}: ${item.link}`}
                  className="inline-flex items-center gap-2 font-montserrat font-semibold text-sm sm:text-base md:text-lg text-amber-500 hover:text-amber-400 group/link transition-colors duration-300 mt-auto focus:outline-none focus:ring-2 focus:ring-amber-500 rounded px-2 py-1"
                >
                  <span>{item.link}</span>
                  <span className="group-hover/link:translate-x-1 transition-transform duration-300">→</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
