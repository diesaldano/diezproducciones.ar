'use client';

import Image from 'next/image';
import type { GalleryImage } from '@/lib/types';

type EventGaleriaProps = {
  images: GalleryImage[];
  title?: string;
};

export function EventGaleria({ images, title = 'GALERÍA VISUAL' }: EventGaleriaProps) {
  if (images.length === 0) return null;

  return (
    <section className="w-full bg-black py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-5xl md:text-6xl font-bold text-white mb-12 text-center">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="aspect-square rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer relative"
            >
              <Image
                src={image.imageUrl}
                alt={image.alt || image.title || 'Gallery image'}
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
