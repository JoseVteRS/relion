import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Gift, ListTodo, Share2, Lock } from "lucide-react";

export const Features = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-foreground mb-12">
          Características que simplifican tu experiencia navideña
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Crear listas */}
          <div className="bg-primary/10 p-8 rounded-3xl shadow-lg md:col-span-2">
            <ListTodo className="w-16 h-16 text-primary mb-6" />
            <h3 className="text-3xl font-semibold text-foreground mb-4">
              Crea listas personalizadas
            </h3>
            <p className="text-lg text-muted-foreground">
              Organiza tus deseos navideños en listas temáticas o por persona.
              Añade, edita y prioriza tus regalos con facilidad.
            </p>
          </div>

          {/* Crear regalos */}
          <div className="bg-secondary p-6 rounded-3xl shadow-lg flex flex-col justify-center">
            <Gift className="w-12 h-12 text-secondary-foreground mb-4" />
            <h3 className="text-2xl font-semibold text-secondary-foreground mb-2">
              Añade regalos detallados
            </h3>
            <p className="text-secondary-foreground/80">
              Describe tus regalos ideales con enlaces, tallas y colores
              preferidos.
            </p>
          </div>

          {/* Compartir listas */}
          <div className="bg-accent p-8 rounded-3xl shadow-lg md:col-span-2 md:row-span-2 flex flex-col justify-between">
            <div>
              <Share2 className="w-16 h-16 text-accent-foreground mb-6" />
              <h3 className="text-3xl font-semibold text-accent-foreground mb-4">
                Comparte tus listas fácilmente
              </h3>
              <p className="text-lg text-accent-foreground/80 mb-6">
                Envía tus listas a amigos y familiares con un simple enlace.
                Permite que otros vean y reserven regalos para evitar
                duplicados.
              </p>
            </div>
            <Button
              asChild
              size="lg"
              className="w-[min-content] text-lg"
            >
              <Link href="/sign-in">Empieza a compartir</Link>
            </Button>
          </div>

          {/* Privacidad */}
          <div className="bg-card p-6 rounded-3xl shadow-lg">
            <Lock className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-semibold text-card-foreground mb-2">
              Control total de privacidad
            </h3>
            <p className="text-muted-foreground">
              Decide quién puede ver tus listas y regalos. Mantén la sorpresa
              con opciones de privacidad flexibles.
            </p>
          </div>

          {/* CTA */}
          <div className="bg-primary p-6 rounded-3xl shadow-lg flex flex-col justify-center items-center text-center">
            <h3 className="text-2xl font-semibold text-primary-foreground mb-4">
              ¿Listo para organizar tu Navidad?
            </h3>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-lg"
            >
              <Link href="/sign-in">Comienza gratis</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
