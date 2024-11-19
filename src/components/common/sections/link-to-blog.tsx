"use client";

import { TitlePage } from "@/components/common/page-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  ArrowRightFromLine,
  ArrowRightIcon,
  Calendar,
  EyeIcon,
  GiftIcon,
  MoveRight,
} from "lucide-react";
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
          <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-8">
            <Link href="/es/listas/navidad" className="group">
              <Card className="relative h-full overflow-hidden border-white/10 bg-black/20">
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
                    Crea una lista de regalos navideños online, compártela
                    fácilmente con familia y amigos, evita duplicados y organiza
                    todos los detalles de las fiestas. La manera más mágica de
                    gestionar los regalos en Navidad
                  </p>
                  <div className="flex items-center gap-2 justify-end group-hover:gap-4 transition-all duration-300">
                    <span className="text-white">Leer</span>
                    <MoveRight className="size-6 fill-white" />
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/es/listas/boda" className="group">
              <Card className="relative h-full overflow-hidden border-white/10 bg-black/20">
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
                    Crea una lista de regalos para tu boda online, compártela
                    fácilmente con tus invitados, evita duplicados y organiza
                    todos los detalles de tu día especial. La manera más
                    elegante y práctica de gestionar los regalos de tu boda.
                  </p>
                  <div className="flex items-center gap-2 justify-end group-hover:gap-4 transition-all duration-300  mt-5">
                    <span className="text-white">Leer</span>
                    <MoveRight className="size-6 fill-white" />
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/es/listas/boda" className="group">
              <Card className="relative h-full overflow-hidden border-white/10 bg-black/20">
                <img
                  src="/images/listas/birthday-001.webp"
                  alt="Lista para cumpleaños"
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-300"
                />
                <CardContent className="relative h-full flex flex-col justify-end p-8">
                  <h3 className="text-3xl font-bold text-white mb-2  mt-5">
                    Lista para cumpleaños
                  </h3>
                  <p className="text-lg text-neutral-300">
                    Crea una lista de regalos para tu cumpleaños online,
                    compártela fácilmente con amigos y familia, evita duplicados
                    y asegúrate de recibir los regalos que realmente deseas. La
                    manera más inteligente de celebrar tu día especial
                  </p>
                  <div className="flex items-center gap-2 justify-end group-hover:gap-4 transition-all duration-300 mt-5">
                    <span className="text-white">Leer</span>
                    <MoveRight className="size-6 fill-white" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
