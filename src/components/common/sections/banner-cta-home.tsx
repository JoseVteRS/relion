"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function BannerCTAHome() {
  return (
    <section className="relative overflow-hidden bg-neutral-950 py-20">
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-8 text-4xl font-bold text-white sm:text-5xl">
            Crea tu lista de regalos hoy mismo
          </h2>
          <p className="mb-8 text-lg text-neutral-300">
            Organiza tus regalos de manera sencilla y práctica. Comparte tu lista con familia y amigos, 
            evita duplicados y asegúrate de recibir los regalos que realmente deseas.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/es/sign-up">
              <Button 
                size="lg"
              >
                Crear mi lista gratis
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
