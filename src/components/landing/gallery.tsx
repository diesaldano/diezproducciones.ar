'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = [
  { src: '/fotos/foto-promo.jpg', alt: 'AUTOS ROBADOS - Promo' },
  { src: '/fotos/gallery-uno.jpg', alt: 'AUTOS ROBADOS - Gallery 1' },
  { src: '/fotos/gallery-dos.jpg', alt: 'AUTOS ROBADOS - Gallery 2' },
  { src: '/fotos/gallery-tres.jpg', alt: 'AUTOS ROBADOS - Gallery 3' },
  { src: '/fotos/gallery-cuatro.jpg', alt: 'AUTOS ROBADOS - Gallery 4' },
  { src: '/fotos/gallery-cinco.jpg', alt: 'AUTOS ROBADOS - Gallery 5' },
  { src: '/fotos/gallery-seis.jpg', alt: 'AUTOS ROBADOS - Gallery 6' },
];

export function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger animation for images
      imagesRef.current.forEach((image, index) => {
        if (!image) return;

        gsap.from(image, {
          opacity: 0,
          y: 50,
          duration: 0.6,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: image,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        });

        // Subtle parallax effect
        gsap.to(image, {
          y: -20,
          scrollTrigger: {
            trigger: image,
            start: 'top center',
            end: 'bottom center',
            scrub: 0.5,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="py-16 md:py-24 bg-black px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
          GALERÍA
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((image, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) imagesRef.current[index] = el;
              }}
              className="aspect-square rounded-lg overflow-hidden bg-gray-900 group cursor-pointer relative"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                quality={80}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
