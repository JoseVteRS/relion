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
    <section className="bg-black text-foreground min-h-screen ">
      <div className="flex justify-end w-full pt-20 mx-auto max-w-screen-2xl">
        <a
          href="https://www.producthunt.com/products/relion/reviews?utm_source=badge-product_review&utm_medium=badge&utm_souce=badge-relion"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/product_review.svg?product_id=724000&theme=light"
            alt="Relion - Create, organize, and share your gift lists. | Product Hunt"
            width={250}
            height={54}
            className="w-[250px] h-[54px]"
          />
        </a>
      </div>
      <div className="flex flex-col lg:flex-row gap-20 items-start justify-center  overflow-hidden max-w-screen-2xl mx-auto pt-20 px-5">
        <div className="w-full md:w-1/2 mt-10">
          <Badge variant="outline" className="text-white">
            beta
          </Badge>
          <h1 className="text-6xl text-center md:text-left tracking-tight md:text-8xl text-balance font-black dark:text-white">
            <span className="bg-gradient-to-r from-primary/80 via-primary to-primary-foreground/30 bg-clip-text text-transparent">
              {t("titleStart")}
            </span>
          </h1>
          <div className="font-extralight text-base text-pretty text-center md:text-left md:text-4xl dark:text-neutral-200 py-4">
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
    </section>
  );
};
