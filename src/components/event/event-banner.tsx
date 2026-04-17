'use client';

type EventBannerProps = {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function EventBanner({
  title = 'QUIERO ENTRADAS + BEBIDAS',
  subtitle = '⚡ Capacidad limitada · Anticipate, evita filas y obtené mejor precio',
  ctaLabel = 'COMPRAR ENTRADAS →',
  ctaHref = '/checkout',
}: EventBannerProps) {
  return (
    <section className="w-full bg-gradient-to-r from-amber-600 to-amber-500 py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
          {title}
        </h2>
        <p className="font-montserrat text-lg text-gray-900 mb-8">
          {subtitle}
        </p>
        <a
          href={ctaHref}
          className="inline-block bg-black hover:bg-gray-900 text-amber-500 font-montserrat font-bold py-4 px-10 rounded-lg transition-all duration-200 text-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-amber-600 min-h-12"
          aria-label={ctaLabel}
        >
          {ctaLabel}
        </a>
      </div>
    </section>
  );
}
