"use client";

import { CtaButton } from "@/components/cta-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SignInGoogleButton } from "@/features/auth/components/sign-in-google-button";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import posthog from "posthog-js";
import AnimatedBorderButton from "../spectacular-background";

export const Header = () => {
  const locale = useLocale();
  const t = useTranslations("Home.Header");

  const handleClick = () => {
    posthog.capture("home_signup", {
      provider: "Credentials",
    });
  };

  return (
    <section className="bg-black text-foreground min-h-full">
      <div className="flex flex-col lg:flex-row gap-20 items-start justify-center pb-20 pt-10 overflow-hidden max-w-screen-2xl mx-auto px-5">
        <div className="w-full md:w-1/2">
          <Badge variant="outline" className="text-white">
            beta
          </Badge>
          <h1 className="sr-only">
            Crea listas de regalos para Navidad o cualquier ocasión
          </h1>
          <div className="text-6xl text-center md:text-left tracking-tight md:text-8xl text-balance font-black  text-white">
            {t("titleStart")}
          </div>
          <div className="font-extralight text-base text-pretty text-center md:text-left md:text-4xl text-neutral-400 py-4">
            {t("subtitle")}
          </div>
          <div className="mt-8 md:flex space-y-4 md:space-y-0 justify-start gap-4">
            <Button
              asChild
              className="w-full md:w-full"
              size="lg"
              onClick={handleClick}
            >
              <Link href={`/${locale}/sign-up`}>{t("buttonCreateList")}</Link>
            </Button>

            <SignInGoogleButton />
          </div>
        </div>
        <div className="relative w-full md:w-1/2">
          <div className="rounded-2xl aspect-[727/697]">
            <img
              src="/home/image-header-01.webp"
              alt="Ilustración de regalos"
              width={727}
              height={697}
              className="border border-white/10 aspect-[727/697] p-1 rounded-xl bg-black/20  relative z-20"
            />

            <div className="absolute -inset-0 rounded-md aspect-[727/697] z-10 overflow-hidden">
              <div className="absolute inset-0 rounded-md bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-500 animate-[spin_10s_linear_infinite] blur-[100px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
