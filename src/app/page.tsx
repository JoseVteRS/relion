import { auth } from "@/auth";
import { Navbar } from "@/components/common/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <header>
        <Navbar />
      </header>
      <div className="container mx-auto max-w-[800px] pt-10">
        <h2 className="text-neutral-50 font-bold text-5xl">
          Que te <span className="text-emerald-500">regalen</span> lo que te{" "}
          <span className="text-emerald-500">gusta</span>
        </h2>
      </div>
      <div className="container mx-auto max-w-[800px] pt-10 pb-20">
        <Button variant="primary" className="" asChild>
          <Link href="/sign-up">Crear mi primera lista</Link>
        </Button>
      </div>
      <section className="bg-gradient-to-b from-emerald-900 to-emerald-800 py-16">
        <div className="container mx-auto max-w-[800px]">
          <h3 className="text-4xl font-bold text-white mb-6">
            ¡<span className="text-neutral-900 text-8xl font-bold">No</span> más
            calcetines sorpresa!
          </h3>
          <p className="text-xl text-emerald-100 mb-8">
            Con Regalame, tus tíos no tendrán excusa para regalarte otro suéter
            feo esta Navidad.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto max-w-[800px]">
          <h3 className="text-3xl font-bold text-emerald-500 mb-6">
            ¿Cómo funciona? Es más fácil que explicarle a tu abuela cómo usar
            WhatsApp
          </h3>
          <ul className="list-disc list-inside text-lg text-neutral-200 space-y-4">
            <li className="transform hover:translate-x-2 transition-transform duration-300">
              Crea tu lista de <strong className="text-primary">regalos</strong>
            </li>
            <li className="transform hover:translate-x-2 transition-transform duration-300">
              Vincúlalos a una <strong className="text-primary">lista</strong>
            </li>
            <li className="transform hover:translate-x-2 transition-transform duration-300">
              Comparte con amigos y familia.
            </li>
            <li className="transform hover:translate-x-2 transition-transform duration-300">
              Recibe regalos que realmente quieres.
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-emerald-700 py-16">
        <div className="container mx-auto max-w-[800px] text-center">
          <h3 className="text-4xl font-bold text-white mb-6">
            ¡Dile adiós a los regalos reciclados!
            <p className="italic text-lg text-neutral-900 font-bold mt-3">
              (y a las colas de las tiendas para devolver ese jarsey)
            </p>
          </h3>
          <p className="text-xl text-emerald-100 mb-8">
            Regístrate ahora y comienza a recibir regalos que realmente te
            gusten.
          </p>
          <Button variant="secondary" size="lg" className="" asChild>
            <Link href="/sign-up">¡Quiero regalos chulos ya!</Link>
          </Button>
        </div>
      </section>


      <section className="py-16">
        <div className="container mx-auto max-w-[800px] text-center">
          <h3 className="text-3xl font-bold text-emerald-500 mb-6">
            ¿Todavía estás aquí? ¡Vamos, que los calcetines de la abuela no se regalarán solos!
          </h3>
          <p className="text-xl text-neutral-200 mb-8">
            No dejes que otro año pase recibiendo regalos que terminarán en el fondo del armario. 
            Con Regalante, tus seres queridos sabrán exactamente qué regalarte 
            (y no, no es otro set de tuppers).
          </p>
          <Button variant="primary" size="lg" asChild>
            <Link href="/sign-up">¡Únete ahora y salva la Navidad!</Link>
          </Button>
        </div>
      </section>


      <footer className="bg-background py-8 text-emerald-100">
        <div className="container mx-auto max-w-[800px]">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="">
              <h4 className="text-xl font-bold mb-2">Regalante</h4>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
