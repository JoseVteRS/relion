import { Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const NewsletterSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-primary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block p-2 bg-primary/20 rounded-full mb-6">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
            ¿Curioso por saber cómo avanza{" "}
            <span className="text-highlight">nuestra app de deseos</span>?{" "}
            ¡Suscríbete para no perderte nada!
          </h2>
          <ul className="text-xl text-muted-foreground mb-12 space-y-4">
            <li className="flex items-center justify-center">
              - Actualizaciones semanales sobre el desarrollo de nuestra app
            </li>
            <li className="flex items-center justify-center">
              - Acceso anticipado cuando lancemos la aplicación
            </li>
          </ul>

          <Button asChild className="text-lg px-8 py-3">
            <Link href="https://relion.ck.page/1068977cd5" target="_blank" rel="noopener noreferrer">¡Quiero ser pionero!</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
