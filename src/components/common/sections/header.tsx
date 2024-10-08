import { Button } from "@/components/ui/button";
import { CheckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Background } from "../background";
export const Header = () => {
  return (
    <header className="py-20 bg-background relative">
      <Background
        size="w-40 h-40"
        blur="blur-[180px]"
        color="bg-primary"
        position="top-96 md:top-56 right-0"
        className="absolute z-0"
      />
      <Background
        size="w-80 h-80"
        blur="blur-[200px]"
        color="bg-primary"
        position="left-[300px] top-20 left-5"
        className="absolute z-0 opacity-30"
      />
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
            <h1 className="text-5xl md:text-7xl font-extrabold text-foreground mb-6 text-center">
              Navidad sin <span className="text-primary">sorpresas</span>
            </h1>
            <p className="text-2xl text-muted-foreground mb-8 text-center">
              Organiza tus regalos ahora y disfruta de unas fiestas sin estrés
            </p>
            <div className="flex items-center justify-center mb-10">
            <Button size="lg" className="text-lg px-8 py-4" asChild>
              <Link href="/sign-in">Crear mi lista navideña</Link>
            </Button>
            </div>
  
          </div>
          <div className="lg:w-full flex justify-center">
            <Image
              src="/home/image-03.webp"
              alt="Regalos navideños organizados"
              width={1200}
              height={676}
              className="rounded-lg shadow-lg"
              quality={60}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
