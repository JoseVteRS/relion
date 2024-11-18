"use client";

import { TitlePage } from "@/components/common/page-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, EyeIcon, GiftIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

export function LinkToBlog() {
  const locale = useLocale();
  const t = useTranslations("Dashboard.FavoriteLists");

  return (
    <section className="py-16 bg-neutral-950 relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <h2 className="text-6xl mb-5 font-bold text-center text-white">
          Listas para cualquier ocasión
        </h2>
        <p className="text-3xl font-light text-center text-neutral-400 mb-16">
          Crea listas de regalos con Relion para cualquier ocasión
        </p>

        <div>
          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/es/listas/navidad" className="group">
              <Card className="relative h-[300px] overflow-hidden border-white/10 bg-black/20">
                <img
                  src="/images/list-christmas.webp"
                  alt="Lista de navidad"
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-300"
                />
                <CardContent className="relative h-full flex flex-col justify-end p-8">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    Lista de Navidad
                  </h3>
                  <p className="text-lg text-neutral-300">
                    Organiza los regalos navideños para toda la familia
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/es/listas/boda" className="group">
              <Card className="relative h-[300px] overflow-hidden border-white/10 bg-black/20">
                <img
                  src="/images/list-weading.webp"
                  alt="Lista de bodas"
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-300"
                />
                <CardContent className="relative h-full flex flex-col justify-end p-8">
                  <h3 className="text-3xl font-bold text-white mb-2">
                    Lista de Bodas
                  </h3>
                  <p className="text-lg text-neutral-300">
                    Crea una lista de regalos para tu boda y compártela con tus
                    invitados
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
