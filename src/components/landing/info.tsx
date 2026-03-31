'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Calendar, MapPin, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function InfoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item, index) => {
        if (!item) return;

        gsap.from(item, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          delay: index * 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="py-16 md:py-24 bg-gray-900 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
          EVENTO
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Calendar,
              title: 'Fecha',
              content: 'Próximamente',
            },
            {
              icon: MapPin,
              title: 'Lugar',
              content: 'SPACIO | Buenos Aires',
            },
            {
              icon: Clock,
              title: 'Horario',
              content: '21:00 hs en adelante',
            },
          ].map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div
                key={index}
                ref={(el) => {
                  if (el) itemsRef.current[index] = el;
                }}
                className="bg-gray-800 rounded-lg p-8 text-center hover:bg-gray-700 transition-colors duration-300"
              >
                <IconComponent size={48} className="text-amber-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {item.title}
                </h3>
                <p className="text-gray-300">{item.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
