import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
            <h1 className="text-5xl md:text-6xl font-extrabold text-foreground mb-6">
              Regala con
              <span className="text-primary"> propósito</span>
            </h1>
            <p className="text-2xl font-bold text-primary mb-4">
              Regalos perfectos, sin estrés ni duplicados
            </p>
            <p className="text-xl text-muted-foreground mb-8">
              Simplifica la organización de regalos para todas tus celebraciones
              con nuestra plataforma única.
            </p>
            <div className="bg-secondary p-6 rounded-lg mb-8">
              <h2 className="text-2xl font-bold mb-4">¿Por qué elegirnos?</h2>
              <ul className="text-lg space-y-3">
                <li className="flex items-center">
                  <svg
                    className="w-6 h-6 mr-2 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Crea y gestiona listas de deseos fácilmente
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-6 h-6 mr-2 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Comparte con amigos y familia en un clic
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-6 h-6 mr-2 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Evita regalos duplicados automáticamente
                </li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Button size="lg" className="text-lg px-8 py-4" asChild>
                <Link href="/sign-in">Comienza gratis</Link>
              </Button>
              <span className="text-muted-foreground">¡Sin compromiso!</span>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center lg:justify-end">
            <Image
              src="/home/image-02.webp"
              alt="Ilustración de regalos perfectos y organizados"
              width={500}
              height={500}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
        <div className="flex flex-col items-center py-10">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Descubre cómo funciona
          </h2>
          <video
            src="/home/video-home.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="rounded-3xl shadow-lg w-full max-w-[400px] h-auto border-[10px] border-black mb-8"
          >
            Tu navegador no soporta el elemento de video.
          </video>
          <p className="text-sm text-muted-foreground text-center max-w-2xl">
            Nota: Esta plataforma está actualmente en desarrollo. Lo que ves son
            avances preliminares y la funcionalidad completa aún no está
            disponible en producción.
          </p>
        </div>
      </div>
    </header>
  );
};
