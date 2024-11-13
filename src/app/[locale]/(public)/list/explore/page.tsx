"use client";

import { Button } from "@/components/ui/button";
import { CardList } from "@/features/list/components/card-list";
import { CardPresent } from "@/features/present/components/card-present";
import { ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";

const EXAMPLE_LISTS = [
  {
    id: "example-1",
    name: "Mi Boda",
    status: true,
    eventDate: "2024-08-15",
    presents: new Array(3),
    user: {
      name: "María García",
    },
  },
  {
    id: "example-2",
    name: "Baby Shower",
    status: true,
    eventDate: "2024-06-01",
    presents: new Array(5),
    user: {
      name: "Ana Martínez",
    },
  },
];

const EXAMPLE_PRESENTS = [
  {
    id: "present-1",
    name: "Robot de Cocina",
    status: false,
    description:
      "Robot de cocina multifunción para preparar todo tipo de recetas",
    link: "amazon.es/robot-cocina",
    list: {
      id: "example-1",
      name: "Mi Boda",
    },
  },
  {
    id: "present-2",
    name: "Set de Toallas",
    status: false,
    description: "Set completo de toallas de algodón egipcio",
    link: "elcorteingles.es/toallas",
    list: {
      id: "example-1",
      name: "Mi Boda",
    },
  },
];

export default function ExplorePage() {
  const locale = useLocale();
  return (
    <div className="container max-w-5xl py-8">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Descubre el Regalo Perfecto</h1>
          <p className="text-lg text-muted-foreground">
            Crea tu lista de regalos y compártela con tus seres queridos
          </p>
        </div>

        <div className="grid gap-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Listas de Ejemplo</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {EXAMPLE_LISTS.map((list) => (
                <CardList key={list.id} list={list as any} />
              ))}
            </div>
          </section>

          <div className="flex justify-center">
            <Link href={`/${locale}/auth/register`}>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Crea tu lista gratis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Regalos Populares</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {EXAMPLE_PRESENTS.map((present) => (
                <CardPresent key={present.id} present={present as any} />
              ))}
            </div>
          </section>

          <div className="bg-primary/5 rounded-lg p-8 text-center space-y-4">
            <h2 className="text-2xl font-bold">
              ¿Listo para crear tu lista de regalos?
            </h2>
            <p className="text-muted-foreground">
              Únete ahora y empieza a organizar tus regalos de manera fácil
            </p>
            <Link href={`/${locale}/auth/register`}>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-lg px-8"
              >
                Comenzar Ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
