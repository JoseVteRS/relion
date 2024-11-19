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
            Organiza tus regalos de manera sencilla y práctica. Comparte tu
            lista con familia y amigos, evita duplicados y asegúrate de recibir
            los regalos que realmente deseas.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button 
              asChild 
              size="lg" 
              className="group relative bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 animate-shimmer border border-white/20 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all duration-300"
            >
              <Link href="/es/sign-up" rel="index follow">
                Crear mi lista gratis
                <ArrowRight className="absolute right-2 group-hover:right-1 size-4 transition-all duration-200" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
