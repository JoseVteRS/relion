import Link from "next/link";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              RegaloConPropósito
            </h3>
            <p className="text-muted-foreground">
              Simplificando la organización de regalos para todas tus
              celebraciones.
            </p>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Enlaces de interés
            </h4>
            <ul className="space-y-1">
              <li>
                <Button variant="link" size="sm" asChild>
                  <Link href="/">Inicio</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" size="sm" asChild>
                  <Link href="#pricing">Precios</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" size="sm" asChild>
                  <Link href="/sign-in">Iniciar sesión</Link>
                </Button>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Legal
            </h4>
            <ul className="space-y-1">
              <li>
                <Button variant="link" size="sm" asChild>
                  <Link href="/legal/terminos-y-condiciones-de-servicio">Términos y condiciones de servicio</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" size="sm" asChild>
                  <Link href="/legal/politicas-de-privacidad">Política de privacidad</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" size="sm" asChild>
                  <Link href="/legal/politicas-de-cookies">Política de cookies</Link>
                </Button>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} RegaloConPropósito.
          </p>
        </div>
      </div>
    </footer>
  );
};