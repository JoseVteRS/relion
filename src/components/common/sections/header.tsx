import { Button } from "@/components/ui/button";
import { GiftIcon, SparklesIcon } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { Background } from "../background";
import { FirstListForm } from "./first-list-form";

export const Header = async () => {
  const { rich } = await getTranslations("Home.Header");
  const locale = await getLocale()

  return (
    <header className="min-h-screen py-24 bg-background/95 relative overflow-hidden">
      {/* Efectos de fondo mejorados */}
      <Background
        size="w-[500px] h-[500px]"
        blur="blur-[120px]"
        color="bg-primary/30"
        position="top-[-10%] right-[-10%]"
        className="absolute z-0 animate-pulse"
      />
      <Background
        size="w-[600px] h-[600px]"
        blur="blur-[150px]"
        color="bg-primary/20"
        position="-left-[10%] top-[30%]"
        className="absolute z-0 animate-pulse delay-700"
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 justify-between">
          <div className="lg:w-1/2 space-y-8">
            {/* Badge superior */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <SparklesIcon className="w-4 h-4" />
              {rich("homeBadge")}
            </div>

            {/* Textos principales */}
            <div className="space-y-6">
              <h1 className="text-6xl font-bold">
                {rich("titleStart")}{" "}
                <span className="text-primary relative">
                  {rich("titleHighlight")}
                </span>
              </h1>

              <p className="text-xl text-muted-foreground">
                {rich("subtitle")}
              </p>
            </div>

            {/* CTA y métricas */}
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8 group" asChild>
                  <Link href={`/${locale}/sign-in`}>
                    {rich("buttonCreateList")}
                    <GiftIcon className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8"
                  asChild
                >
                  <Link href={`/${locale}/lists/explore`}>
                    {rich("buttonExplore")}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
