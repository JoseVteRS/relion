"use client";

import { useEffect } from "react";

export function Testimonials() {
  useEffect(() => {}, []);

  return (
    <section className="py-16 bg-neutral-950 relative overflow-hidden">
      <div className="relative z-10">
        <div className="container mx-auto px-4">
          
          {/* Decorative elements */}
          <div className="absolute -left-10 top-20 size-72 bg-yellow-500/20 rounded-full blur-3xl" />
          <div className="absolute -right-20 bottom-10 size-72 bg-red-500/20 rounded-full blur-3xl" />


          <h2 className="text-6xl mb-5 font-bold text-center text-white">
            Opiniones de nuestros usuarios
          </h2>
          <p className="text-3xl font-light text-center text-neutral-400 mb-16">
            Lo que dicen sobre nosotros
          </p>

          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {/* Testimonial 1 */}

            <TestimonialCard
              quote="Antes hacia las listas a través de whastapp. Ahora con Relion es todo más fácil y organizado"
              name="Gemma"
              role="TASOC y Madre"
            />

            {/* Testimonial 2 */}
            <TestimonialCard
              quote="Brutal! Con el tiempo que me ahorro haciendo colas para devolver regalos, estoy haciendo fotos 📸"
              name="Mar"
              role="Fotógrafa"
            />

            {/* Testimonial 3 */}
            <TestimonialCard
              quote="Siempre he recibido algún que otro regalo que no queria y he tenido que devolver. Por ese motivo empecé a usar Relion para que me regalen lo que quiero"
              name="Alba"
              role="Matrona (y de las mejores)"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  quote,
  name,
  role,
}: {
  quote: string;
  name: string;
  role: string;
}) {
  return (
    <div className="col-span-12 md:col-span-4">
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg h-[200px] group overflow-hidden flex flex-col justify-between">
        <p className="text-md font-light text-neutral-400 mb-4">{quote}</p>
        <div>
          <h3 className="text-lg font-bold text-white">{name}</h3>
          <p className="text-sm font-light text-neutral-500">{role}</p>
        </div>
      </div>
    </div>
  );
}
