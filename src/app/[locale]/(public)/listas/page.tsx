import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/dist/client/link";

export const metadata: Metadata = {
  title: "Crea listas de regalos para Navidad o cualquier ocasión",
  description: "Organiza tus regalos de manera sencilla y comparte tu lista con familia y amigos",
};


export default function ListasPage() {
  return (
    <main className="space-y-24">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute -left-10 top-20 size-72 bg-yellow-500/20 rounded-full blur-3xl" />
        <div className="absolute -right-20 bottom-10 size-72 bg-red-500/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Crea listas de regalos para momentos especiales
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-12">
            La forma más sencilla de organizar y compartir tus deseos con familia y amigos
          </p>
          <Button size="lg" asChild>
            <Link href="/es/sign-up">
              Crear mi primera lista
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          ¿Por qué crear una lista de regalos?
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-start space-y-4">
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-semibold text-white">Sin Duplicados</h3>
            <p className="text-neutral-400">
              Evita recibir regalos duplicados gracias a nuestro sistema de reserva en tiempo real. Cuando alguien elige un regalo de tu lista, se marca automáticamente como reservado para que otros no lo elijan. Organiza tus regalos de manera eficiente y evita las molestias de tener que hacer devoluciones.
            </p>
          </div>
          
          <div className="text-start space-y-4">
            <div className="text-4xl mb-4">🎁</div>
            <h3 className="text-xl font-semibold text-white">Lo que deseas</h3>
            <p className="text-neutral-400">Recibe los regalos que realmente quieres y deseas. Evita sorpresas desagradables y asegúrate de que cada regalo sea especial y significativo para ti. Con nuestra lista de regalos online, tus seres queridos sabrán exactamente qué regalarte. Personaliza cada detalle de tu lista para que tus invitados acierten siempre.</p>
          </div>

          <div className="text-start space-y-4">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-semibold text-white">Comparte fácil</h3>
            <p className="text-neutral-400">Comparte tu lista de regalos con amigos y familiares de forma rápida y sencilla a través de un único enlace. Nuestro sistema permite compartir tu lista a través de diferentes plataformas como WhatsApp, correo electrónico o redes sociales. Mantén a todos informados sobre tus deseos y preferencias de manera eficiente.</p>
          </div>

          <div className="text-start space-y-4">
            <div className="text-4xl mb-4">💝</div>
            <h3 className="text-xl font-semibold text-white">Todo en uno</h3>
            <p className="text-neutral-400">Gestiona todos los aspectos de tu lista de regalos desde una única plataforma intuitiva y fácil de usar. Añade, edita o elimina regalos, controla las reservas y comunícate con tus invitados desde un solo lugar. Nuestra plataforma centralizada te permite ahorrar tiempo y esfuerzo en la gestión de tus regalos.</p>
          </div>
        </div>
      </section>

      {/* Lists Types Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Listas para cada ocasión
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            En Relion puedes crear listas para cualquier momento especial. Desde bodas hasta cumpleaños, 
            pasando por Navidad y baby showers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article className="group">
            <Link href="/es/listas/navidad" className="block">
              <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black/20">
                <img
                  src="/images/list-christmas.webp"
                  alt="Lista de regalos de Navidad"
                  className="aspect-[4/3] w-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-2xl font-bold text-white mb-2">Lista de Navidad</h3>
                  <p className="text-sm text-neutral-200">
                    La forma más mágica de organizar los regalos en estas fiestas.
                  </p>
                  <Button variant="link" className="mt-4 text-white group-hover:translate-x-2 transition-transform">
                    Crear lista <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Link>
          </article>

          <article className="group">
            <Link href="/es/listas/boda" className="block">
              <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black/20">
                <img
                  src="/images/list-weading.webp"
                  alt="Lista de regalos de boda"
                  className="aspect-[4/3] w-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-2xl font-bold text-white mb-2">Lista de Boda</h3>
                  <p className="text-sm text-neutral-200">
                    Organiza los regalos de tu boda de forma elegante y práctica.
                  </p>
                  <Button variant="link" className="mt-4 text-white group-hover:translate-x-2 transition-transform">
                    Crear lista <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Link>
          </article>

          <article className="group">
            <Link href="/es/listas/cumpleanos" className="block">
              <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black/20">
                <img
                  src="/images/listas/birthday-001.webp"
                  alt="Lista de regalos de cumpleaños"
                  className="aspect-[4/3] w-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-2xl font-bold text-white mb-2">Lista de Cumpleaños</h3>
                  <p className="text-sm text-neutral-200">
                    Recibe los regalos que realmente quieres en tu día especial.
                  </p>
                  <Button variant="link" className="mt-4 text-white group-hover:translate-x-2 transition-transform">
                    Crear lista <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Link>
          </article>
        </div>
      </section>


      {/* CTA Section */}
      <section className="bg-neutral-950 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              Empieza a crear tu lista de regalos hoy
            </h2>
            <p className="text-xl text-neutral-300 mb-8">
              Organiza tus regalos de manera sencilla y comparte tu lista con familia y amigos
            </p>
            <Link href="/es/sign-up">
              <Button size="lg" className="gap-2">
                Crear mi lista gratis
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}