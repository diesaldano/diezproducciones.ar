'use client';

import Image from 'next/image';

export function GaleriaSection() {
  const images = [
    { id: 1, src: '/fotos/foto-promo.jpeg', alt: 'AUTOS ROBADOS - Promo' },
    { id: 5, src: '/fotos/gallery-cuatro.jpeg', alt: 'AUTOS ROBADOS - Promo' },
    { id: 2, src: '/fotos/gallery-uno.jpeg', alt: 'AUTOS ROBADOS - Plano General' },
    { id: 4, src: '/fotos/gallery-tres.jpeg', alt: 'AUTOS ROBADOS - Plano General' },
    { id: 3, src: '/fotos/gallery-dos.jpg', alt: 'AUTOS ROBADOS - Promo' },
    { id: 6, src: '/fotos/gallery-cinco.jpeg', alt: 'AUTOS ROBADOS - Plano General' },
  ];

  return (
    <section className="w-full bg-black py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-12 text-center">
          GALERÍA VISUAL
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="aspect-square rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer relative"
            >
              <Image 
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={75}
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
