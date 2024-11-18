import { Button } from "@/components/ui/button";
import { X, XIcon } from "lucide-react";
import Link from "next/link";
import { BsGithub, BsTwitterX } from "react-icons/bs";
import LogoLight from "../logo/logo-light";

export const Footer = () => {
  return (
    <footer className="py-12 bg-black border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center md:text-left">
            <h3 className="font-bold text-foreground items-center flex justify-center md:justify-start">
              <Link href="/es">
                <LogoLight  />
              </Link>
              <span className="sr-only">Relion</span>
            </h3>
            <p className="text-muted-foreground">
              En Relion puedes crear una lista de regalos y compartirla con tu
              familia y amigos sin necesidad de registro.
            </p>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold text-white mb-4">
              Enlaces de interés
            </h4>
            <ul className="space-y-1">
              <li>
                <Button variant="link" size="sm" asChild>
                  <Link href="/es/">Inicio</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" size="sm" asChild>
                  <Link href="/es/sign-in">Iniciar sesión</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" size="sm" asChild>
                  <Link href="/es/sign-up">Registrarme</Link>
                </Button>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold text-white mb-4">
              Legal
            </h4>
            <ul className="space-y-1">
              <li>
                <Button variant="link" size="sm" asChild>
                  <Link href="/es/legal/terminos-y-condiciones-de-servicio">
                    Términos y condiciones de servicio
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="link" size="sm" asChild>
                  <Link href="/es/legal/politicas-de-privacidad">
                    Política de privacidad
                  </Link>
                </Button>
              </li>
              <li>
                <Button variant="link" size="sm" asChild>
                  <Link href="/es/legal/politicas-de-cookies">
                    Política de cookies
                  </Link>
                </Button>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold text-white mb-4">
              Sígueme en:
            </h4>
            <ul className="space-y-1 flex items-center justify-center md:justify-start gap-2">
              <li>
                <Button
                  variant="secondary"
                  size="icon"
                  asChild
                  aria-label="Sígueme en X"
                >
                  <Link
                    href="https:/x.com/ImSilencio_"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsTwitterX />
                  </Link>
                </Button>
              </li>
              <li>
                <Button
                  variant="secondary"
                  size="icon"
                  asChild
                  aria-label="Sígueme en GitHub"
                >
                  <Link
                    href="https://github.com/ImSilencio_"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BsGithub className="size-5" />
                  </Link>
                </Button>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full border-t border-white/10 mt-5">
          <div className="w-full text-center md:text-left mt-5 flex justify-center items-center">
            <h4 className="text-md font-semibold text-foreground">
              Made with ❤️ by&nbsp;
            </h4>

            <Link
              className="text-primary hover:underline"
              href="https:/x.com/ImSilencio_"
              target="_blank"
              rel="noopener noreferrer"
            >
              @ImSilencio_
            </Link>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground">
              &copy; {new Date().getFullYear()} Relion.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
