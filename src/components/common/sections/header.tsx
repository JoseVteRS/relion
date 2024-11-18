"use client";

import { CtaButton } from "@/components/cta-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SignInGoogleButton } from "@/features/auth/components/sign-in-google-button";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import posthog from "posthog-js";

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
      <div className="flex flex-col lg:flex-row gap-20 items-start justify-center py-24  overflow-hidden max-w-screen-2xl mx-auto pt-20 px-5">
        <div className="w-full md:w-1/2 mt-10 py-20">
          <Badge variant="outline" className="text-white">
            beta
          </Badge>
          <h1 className="text-6xl text-center md:text-left tracking-tight md:text-8xl text-balance font-black dark:text-white">
            <span>{t("titleStart")}</span>
          </h1>
          <div className="font-extralight text-base text-pretty text-center md:text-left md:text-4xl dark:text-neutral-400 py-4">
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
        <div className="relative   p-2 w-full md:w-1/2">
          <div className="rounded-2xl">
            <img
              src="/home/image-header-01.webp"
              alt="Ilustración de regalos"
              className="border border-white/10 rounded-md bg-card p-16 relative z-20"
            />
            <div className="absolute -inset-1 rounded-md blur-md bg-gradient-to-br from-purple-500 via-yellow-500 to-pink-500 z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
