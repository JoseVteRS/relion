import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
            <h1 className="text-5xl md:text-6xl font-extrabold text-foreground mb-6">
              ¡Navidad sin sorpresas
              <span className="text-primary"> indeseadas</span>!
            </h1>
            <p className="text-2xl font-bold text-primary mb-4">
              Organiza tus regalos ahora y disfruta de unas fiestas sin estrés
            </p>
            <p className="text-xl text-muted-foreground mb-8">
              Faltan solo 79 días para Navidad. ¿Estás preparado para evitar
              otro año de calcetines y perfumes no deseados?
            </p>
            <div className="bg-secondary p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4">
                ¿Por qué empezar ahora?
              </h2>
              <ul className="text-lg space-y-3">
                <li className="flex items-center">
                  <CheckIcon className="w-6 h-6 mr-2 text-primary" />
                  Anticípate al caos navideño y ahorra tiempo
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-6 h-6 mr-2 text-primary" />
                  Da tiempo a tus seres queridos para encontrar el regalo
                  perfecto
                </li>
                <li className="flex items-center">
                  <CheckIcon className="w-6 h-6 mr-2 text-primary" />
                  Evita las compras de último minuto y los regalos duplicados
                </li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="text-lg px-8 py-4" asChild>
                <Link href="/sign-in">¡Crea tu lista navideña ya!</Link>
              </Button>
              <span className="text-muted-foreground">
                ¡La Navidad perfecta comienza hoy!
              </span>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <Image
              src="/home/image-03.webp"
              alt="Regalos navideños perfectamente organizados"
              width={1200}
              height={676}
              className="rounded-lg shadow-lg"
              quality={60}
            />
          </div>
        </div>
        {/* <div className="flex flex-col items-center py-10">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Descubre cómo hacer de esta Navidad la mejor de todas
          </h2>
          <video
            src="/home/video-navidad.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="rounded-3xl shadow-lg w-full max-w-[400px] h-auto border-[10px] border-red-600 mb-8"
          >
            Tu navegador no soporta el elemento de video.
          </video>
          <p className="text-sm text-muted-foreground text-center max-w-2xl">
            No dejes que el estrés navideño arruine tus fiestas. Con nuestra
            plataforma, organizar tus regalos es tan fácil como comer turrón.
            ¡Empieza hoy y disfruta de una Navidad sin preocupaciones!
          </p>
        </div> */}
      </div>
    </header>
  );
};
