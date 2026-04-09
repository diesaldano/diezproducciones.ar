'use client';

import type { Drink } from '@/lib/types';

type EventDrinksProps = {
  drinks: Drink[];
  title?: string;
};

function formatPrice(price: number): string {
  return `$${price.toLocaleString('es-AR')}`;
}

export function EventDrinks({ drinks, title = 'BEBIDAS EN PREVENTA' }: EventDrinksProps) {
  const available = drinks.filter((d) => d.available);
  if (available.length === 0) return null;

  // Group by category
  const categories = Array.from(new Set(available.map((d) => d.category || 'otro')));

  return (
    <section className="w-full bg-black py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight">
            {title}
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full"></div>
        </div>

        {categories.map((cat) => (
          <div key={cat} className="mb-12 last:mb-0">
            <h3 className="font-montserrat text-amber-500 font-bold text-lg uppercase tracking-widest mb-6">
              {cat}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {available
                .filter((d) => (d.category || 'otro') === cat)
                .map((drink) => (
                  <div
                    key={drink.id}
                    className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-amber-500/60 transition-all duration-300"
                  >
                    <h4 className="font-montserrat font-semibold text-white text-lg mb-1">
                      {drink.name}
                    </h4>
                    {drink.description && (
                      <p className="font-montserrat text-sm text-gray-400 mb-3">
                        {drink.description}
                      </p>
                    )}
                    <p className="font-montserrat text-2xl font-bold text-amber-500">
                      {formatPrice(drink.price)}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
