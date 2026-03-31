'use client';

export function InfoEventoSection() {
  const info = [
    {
      icon: '📍',
      title: 'LOCACIÓN',
      content: ['Rivadavia 13200', 'Diva Rock, Barrio Norte'],
      link: 'VER EN MAPA',
      href: 'https://maps.app.goo.gl/o2PzfRmFsu99Vna49',
    },
    {
      icon: '🎫',
      title: 'FECHA',
      content: ['Viernes, 24 abril', '21:00 HS'],
      link: 'Info',
    },
    {
      icon: '🎟️',
      title: 'ENTRADA',
      content: ['$25000', 'Capacidad limitada'],
      link: 'COMPRAR',
      href: '/checkout',
    },
    {
      icon: '📞',
      title: 'CONTACTO',
      content: ['diezproducciones.arg@gmail.com', 'mail'],
      link: 'ESCRIBIR',
      href: '#',
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
              className="group bg-gray-900/50 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-gray-800 hover:bg-gray-900 hover:border-amber-500/80 transition-all duration-300 flex flex-col h-full"
            >
              {/* Icon */}
              <div className="text-3xl sm:text-5xl mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="font-montserrat font-semibold text-amber-500 text-xs sm:text-sm tracking-widest mb-3 sm:mb-4 uppercase">
                {item.title}
              </h3>

              {/* Content */}
              <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-6 flex-grow">
                {item.content.map((line, i) => (
                  <p
                    key={i}
                    className="font-montserrat text-xs sm:text-sm text-gray-300 leading-tight sm:leading-relaxed break-words"
                  >
                    {line}
                  </p>
                ))}
              </div>

              {/* CTA */}
              {item.href && (
                <a
                  href={item.href}
                  className="inline-flex items-center gap-2 font-montserrat font-semibold text-xs sm:text-sm text-amber-500 hover:text-amber-400 group/link transition-colors duration-300 mt-auto"
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
