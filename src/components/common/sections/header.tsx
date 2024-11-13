import { Button } from "@/components/ui/button";
import { GiftIcon, SparklesIcon } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { Background } from "../background";
import { FirstListForm } from "./first-list-form";

export const Header = async () => {
  const { rich } = await getTranslations("Home.Header");
  const locale = await getLocale();

  return (
    <section className="bg-black text-foreground min-h-screen flex items-center justify-center">
      <div className="">
        <div className="mx-auto w-full text-center">
          <h1 className="text-5xl text-white font-bold">
            <span className="text-6xl font-bold">¡Haz realidad tus deseos!</span>
            <span className="block">
              Crea tu{" "}
              <span className="text-accent font-extrabold inline-block bg-primary p-2 rounded text-black transform -rotate-3">
                lista
              </span>{" "}
              de regalos ideal
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-lg sm:text-xl text-muted">
            Permite que tus amigos y familiares sepan exactamente lo que deseas.
            ¡Convierte cada ocasión en un momento especial!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full rounded-lg bg-primary px-12 py-3 text-sm font-medium text-foreground hover:bg-primary/80 focus:outline-none focus:ring active:bg-primary sm:w-auto"
              href="/es/sign-up"
            >
              Crea tu lista
            </Link>
          </div>
        </div>
        <div className="mt-8 lg:mt-0 lg:ml-8">
          {/* <img
            src="/home/lists-screen.webp"
            alt="Ilustración de regalos"
            width={500}
            height={500}
            className="mx-auto w-full rounded-lg border-2 border-primary"
          /> */}
        </div>
      </div>
    </section>
  );
};
