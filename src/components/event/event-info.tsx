'use client';

import type { EventData } from '@/lib/types';

type InfoItem = {
  icon: string;
  title: string;
  content: string[];
  link?: string;
  href?: string;
  target?: string;
};

type EventInfoProps = {
  event: Pick<EventData, 'address' | 'location' | 'date' | 'priceGeneral' | 'pricePreventa' | 'details'>;
  contactEmails?: string[];
};

function formatDate(isoDate: string): string {
  const d = new Date(isoDate);
  return d.toLocaleDateString('es-AR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).replace(/^\w/, (c) => c.toUpperCase());
}

function formatPrice(cents: number): string {
  return `$${cents.toLocaleString('es-AR')}`;
}

export function EventInfo({ event, contactEmails = [] }: EventInfoProps) {
  const items: InfoItem[] = [];

  // Location
  const locationContent = [event.location];
  if (event.address) locationContent.unshift(event.address);
  items.push({
    icon: '📍',
    title: 'LOCACIÓN',
    content: locationContent,
    ...(event.details?.mapUrl
      ? { link: 'VER EN MAPA', href: event.details.mapUrl, target: '_blank' }
      : {}),
  });

  // Date & time
  const dateContent = [formatDate(event.date)];
  if (event.details?.showStart) dateContent.push(`${event.details.showStart} HS`);
  items.push({ icon: '🎫', title: 'FECHA', content: dateContent });

  // Price
  const priceContent: string[] = [];
  if (event.pricePreventa) priceContent.push(formatPrice(event.pricePreventa));
  else if (event.priceGeneral) priceContent.push(formatPrice(event.priceGeneral));
  if (event.details?.capacity) priceContent.push(`Capacidad: ${event.details.capacity}`);
  if (priceContent.length > 0) {
    items.push({
      icon: '🎟️',
      title: 'ENTRADA',
      content: priceContent,
      link: 'COMPRAR',
      href: '/checkout',
      target: '_self',
    });
  }

  // Contact
  if (contactEmails.length > 0) {
    items.push({
      icon: '📞',
      title: 'CONTACTO',
      content: contactEmails,
      link: 'ESCRIBIR',
      href: `mailto:${contactEmails[0]}${contactEmails.length > 1 ? `?cc=${contactEmails.slice(1).join(',')}` : ''}&subject=Consulta%20Evento`,
    });
  }

  if (items.length === 0) return null;

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
          {items.map((item, idx) => (
            <div
              key={idx}
              className="group bg-gray-900/50 backdrop-blur-sm p-8 sm:p-10 lg:p-12 rounded-lg border border-gray-800 hover:bg-gray-900 hover:border-amber-500/80 transition-all duration-300 flex flex-col h-full"
            >
              <div className="text-5xl sm:text-6xl md:text-7xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="font-montserrat font-semibold text-amber-500 text-sm sm:text-base md:text-lg tracking-widest mb-4 sm:mb-6 uppercase">
                {item.title}
              </h3>
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
