import { Button } from "@/components/ui/button";
import { Gift, ListTodo, Share2, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function Features() {
  const t = useTranslations("Home.Features");

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-foreground mb-12">
          {t("title")}
        </h2>
        <p className="text-lg text-center text-muted-foreground mb-12">
          {t("subtitle")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Crear listas */}
          <div className="border border-primary/20 p-8 rounded-3xl shadow-lg col-span-2">
            <ListTodo className="w-16 h-16 text-primary mb-6" />
            <h3 className="text-3xl font-semibold text-foreground mb-4">
              {t("feature1.title")}
            </h3>
            <p className="text-lg text-muted-foreground">
              {t("feature1.description")}
            </p>
          </div>

          {/* Crear regalos */}
          <div className="border border-primary/20 p-6 rounded-3xl shadow-lg flex flex-col justify-center col-span-2">
            <Gift className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              {t("feature2.title")}
            </h3>
            <p className="text-muted-foreground">
              {t("feature2.description")}
            </p>
          </div>

          {/* Compartir listas */}
          <div className="border border-primary/20 p-8 rounded-3xl shadow-lg md:col-span-3 md:row-span-2 flex flex-col justify-between">
            <div>
              <Share2 className="w-16 h-16 text-primary mb-6" />
              <h3 className="text-3xl font-semibold text-foreground mb-4">
                {t("feature3.title")}
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                {t("feature3.description")}
              </p>
            </div>
          </div>

          {/* Inspiración navideña */}
          <div className="border border-primary/20 p-6 rounded-3xl shadow-lg">
            <Star className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              {t("feature4.title")}
            </h3>
            <p className="text-muted-foreground">
              {t("feature4.description")}
            </p>
          </div>

          {/* CTA */}
          <div className="border border-primary/20 p-6 rounded-3xl shadow-lg flex flex-col justify-center items-center text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              {t("cta.title")}
            </h3>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="text-lg"
            >
              <Link href="/sign-in">{t("cta.button")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};