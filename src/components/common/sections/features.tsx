"use client";

import { Button } from "@/components/ui/button";
import { Gift, GiftIcon, ListTodo, Share, Share2, Star } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect } from "react";

export function Features() {
  const t = useTranslations("Home.Features");
  const locale = useLocale();

  return (
    <section className="py-16 bg-neutral-950 relative overflow-hidden">
      {/* Luces flotantes */}
      {Array.from({ length: 6 }).map((_, i) => (
        <FloatingLight key={i} />
      ))}

      {/* Overlay sutil para suavizar las luces */}
      {/* <div className="absolute inset-0 bg-neutral-950/50" /> */}

      <div className="relative z-10">
        {/* Decorative elements */}
        <div className="absolute -right-20 top-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute -left-20 bottom-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4">
          <h2 className="text-6xl mb-5 font-bold text-center text-white">
            {t("title")}
          </h2>
          <p className="text-3xl font-light text-center text-neutral-400 mb-16">
            {t("subtitle")}
          </p>

          <div className="grid grid-cols-12 gap-4 md:gap-6">
            {/* Feature 1 - Large card */}
            <div className="col-span-12 md:col-span-8">
              <div className="bg-white/5 p-8 rounded-2xl border border-white/10 shadow-lg relative h-[300px] group overflow-hidden">
                <div className="relative z-10">
                  <div className="size-12 bg-purple-500/10 rounded-full flex items-center justify-center mb-4 ">
                    <span className="text-4xl font-bold text-purple-400">
                      1.
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold text-balance max-w-[400px] text-white mb-4">
                    {t("feature1.title")}
                  </h3>
                  <p className="text-xl font-light text-neutral-400 max-w-md">
                    {t("feature1.description")}
                  </p>
                </div>
                <ListTodo className="absolute -right-20 -bottom-20 size-80 text-purple-500/10" />
              </div>
            </div>

            {/* Feature 2 - Small card */}
            <div className="relative col-span-12 md:col-span-4">
              <div className="relative bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg h-[300px] group overflow-hidden">
                <div className="size-12 bg-yellow-500/10 rounded-full flex items-center justify-center mb-4 ">
                  <span className="text-4xl font-bold text-yellow-400">2.</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {t("feature2.title")}
                </h3>
                <p className="text-lg font-light text-neutral-400">
                  {t("feature2.description")}
                </p>
                <GiftIcon className="absolute -right-20 -bottom-20 size-80 text-yellow-500/10" />
              </div>
            </div>

            {/* Feature 3 - Medium card with image */}
            <div className="col-span-12 md:col-span-6">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg relative h-full group overflow-hidden">
                <div className="size-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 ">
                  <span className="text-4xl font-bold text-blue-400">3.</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {t("feature3.title")}
                </h3>
                <p className="text-lg font-light text-neutral-400 max-w-sm">
                  {t("feature3.description")}
                </p>
                <Share2 className="absolute -right-20 -bottom-20 size-80 text-blue-500/10" />
              </div>
            </div>

            {/* Feature 4 - Medium card with gradient */}
            <div className="col-span-12 md:col-span-6">
              <div className="relative bg-gradient-to-br from-white/5 to-purple-500/10 p-6 rounded-2xl border h-full border-white/10 shadow-lg overflow-hidden">
                <div className="size-12 bg-pink-500/10  rounded-full flex items-center justify-center mb-4 ">
                  <span className="text-3xl font-bold text-pink-400">4.</span>
                </div>
                <h3 className="text-2xl text-pretty  font-bold text-white mb-2">
                  {t("feature4.title")}
                </h3>
                <p className="text-lg font-light text-neutral-400">
                  {t("feature4.description")}
                </p>
                <Star className="absolute -right-20 -bottom-20 size-80 text-pink-500/10" />
                <div className="flex justify-end mt-4">
                  <Button className="z-10 text-lg font-semibold w-full h-16" asChild>
                    <Link href={`/${locale}/sign-up`}>
                      {t("cta.button")}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingLight() {
  const colors = [
    "from-purple-500/20",
    "from-blue-500/20",
    "from-pink-500/20",
    "from-indigo-500/20",
  ];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomDuration = `${Math.random() * 10 + 15}s`; // Entre 15-25s
  const randomDelay = `${Math.random() * -20}s`; // Delay negativo para empezar en diferentes posiciones
  const size = Math.random() * 300 + 200; // Entre 200-500px

  return (
    <div
      className={`absolute rounded-full blur-3xl animate-floating opacity-30
        bg-gradient-to-br ${randomColor} to-transparent`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        animationDuration: randomDuration,
        animationDelay: randomDelay,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
    />
  );
}
