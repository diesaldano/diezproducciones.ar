'use client';

import Image from 'next/image';

export function SobreNosotrosSection() {
  return (
    <section className="w-full bg-black py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Logo */}
          <div className="h-96 md:h-[500px] bg-gradient-to-br from-black to-black rounded-lg overflow-hidden flex items-center justify-center order-2 md:order-1 shadow-2xl relative">
            <Image
              src="/diez.png"
              alt="Diez Producciones - Logo"
              width={400}
              height={400}
              className="w-3/4 h-3/4 object-contain hover:scale-110 transition-transform duration-500 filter drop-shadow-lg"
              quality={90}
              priority
            />
          </div>

          {/* Text */}
          <div className="space-y-6 order-1 md:order-2">
            
            <div className="space-y-4 font-montserrat text-gray-300 leading-relaxed">
              <p className="text-lg">
                Hacemos eventos que <span className="text-amber-500 font-semibold">importan</span>.
              </p>
              <p className="text-base">
                Por detrás de cada show está <span className="text-amber-500 font-semibold">Salamanca Producciones + DIEZ Producciones</span>, dos equipos con experiencia sólida en gestión cultural y producción integral de espectáculos. Trabajamos cada detalle para impulsar propuestas de calidad y fortalecer la escena musical independiente en el norte argentino.
              </p>
              <p className="text-base">
                Desde hace años organizamos las mejores experiencias de rock argentino. Bandas sin filtro, público apasionado, y un ambiente que te marca para siempre. Estamos enfocados en hacer de cada evento un momento único que trascienda.
              </p>
              <p className="text-base">
                En esta Preventa vas a encontrar bebidas al mejor precio, sin complicaciones. Solo gente real disfrutando de lo que ama, en el lugar indicado en el momento indicado.
              </p>
            </div>

            <div className="pt-4 border-t border-gray-800">
              <p className="font-montserrat text-amber-500 font-semibold text-lg">
                ✨ Haciendo historia
              </p>
              <p className="font-montserrat text-gray-400 italic mt-2">
                Esa es nuestra forma de vivir
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
