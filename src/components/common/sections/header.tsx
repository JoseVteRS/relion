"use client"

import { CtaButton } from "@/components/cta-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SignInGoogleButton } from "@/features/auth/components/sign-in-google-button";
import Link from "next/link";
import posthog from "posthog-js";

export const Header = () => {
 
  const handleClick = () => {
    posthog.capture("home_signup", {
      provider: "Credentials",
    });
  };

  

  return (
    <section className="bg-black text-foreground min-h-screen ">
      <div className="flex flex-col lg:flex-row gap-20 items-center justify-center  overflow-hidden max-w-screen-2xl mx-auto pt-20 h-[100dvh] px-5">
        <div className="w-full md:w-1/2 mt-10">
          <Badge variant="outline" className="text-white">beta</Badge>
          <h1 className="text-5xl text-center md:text-left tracking-tight text-pretty md:text-7xl font-bold dark:text-white">
            <span className="bg-gradient-to-r from-primary/70 via-primary to-primary-foreground/30 bg-clip-text text-transparent">
              Deja de devolver regalos
            </span>
          </h1>
          <div className="font-extralight text-base text-pretty text-center md:text-left md:text-4xl dark:text-neutral-200 py-4">
            Crea y comparte listas de regalos
          </div>
          <div className="mt-8 md:flex space-y-4 md:space-y-0 justify-start gap-4">
            <Button asChild className="w-full md:w-full" size="lg" onClick={handleClick}>
              <Link
                href="#"
              >
                Crea tu lista
              </Link>
            </Button>

            <SignInGoogleButton />
          </div>
        </div>
        <div className="relative bg-white/5 border border-white/10 rounded-xl p-2 w-full md:w-1/2">
          <div className="rounded-2xl">
            <img
              src="/home/image-header-01.webp"
              alt="Ilustración de regalos"
              className="w-full h-full  rounded-xl"
            />
          </div>
        </div>
      </div>
      <CtaButton />
    </section>
  );
};
