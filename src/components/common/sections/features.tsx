import { Button } from "@/components/ui/button";
import { Gift, ListTodo, Share2, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function Features() {
  const t = useTranslations("Home.Features");

  return (
<section className="py-16 bg-neutral-900">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-center text-primary mb-12">
      Características Principales
    </h2>
    <p className="text-lg text-center text-muted-foreground mb-12">
      Descubre las funcionalidades que ofrecemos para mejorar tu experiencia.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[
        {
          imgSrc: "/home/list-add-screen.webp",
          alt: "Crear listas",
          title: "Crear listas",
          description: "Organiza tus regalos en listas personalizadas para cada ocasión.",
          colSpan: "col-span-2",
        },
        {
          imgSrc: "/home/presents-add-screen.webp",
          alt: "Crear regalos",
          title: "Crear regalos",
          description: "Añade regalos a tus listas de manera fácil y rápida.",
          colSpan: "col-span-2",
        },
        {
          imgSrc: "/home/lists-screen.webp",
          alt: "Compartir listas",
          title: "Compartir listas",
          description: "Comparte tus listas con amigos y familiares para que sepan qué regalarte.",
          colSpan: "md:col-span-3 md:row-span-2",
        },
        {
          imgSrc: "/home/presents-screen.webp",
          alt: "Inspiración navideña",
          title: "Inspiración navideña",
          description: "Encuentra ideas para regalos navideños que sorprenderán a todos.",
          colSpan: "",
        },
      ].map(({ imgSrc, alt, title, description, colSpan }, index) => (
        <div key={index} className={`relative ${colSpan} bg-white p-8 rounded-3xl shadow-lg`}>
          <img src={imgSrc} alt={alt} className="w-full h-full object-cover rounded-3xl" />
          <div className="absolute inset-0 bg-black bg-opacity-50 p-6 rounded-3xl flex flex-col justify-end">
            <h3 className="text-3xl font-semibold text-white mb-4">{title}</h3>
            <p className="text-lg text-white">{description}</p>
          </div>
        </div>
      ))}
      <div className="relative flex flex-col justify-center items-center text-center bg-white p-8 rounded-3xl shadow-lg">
        <img src="/home/cta.jpg" alt="Call to Action" className="w-full h-full object-cover rounded-3xl" />
        <div className="absolute inset-0 p-6 rounded-3xl flex flex-col justify-center items-center">
          <h3 className="text-2xl font-semibold text-white mb-4">Únete a nosotros</h3>
          <Button asChild size="lg" variant="secondary" className="text-lg">
            <Link href="/sign-in">Regístrate ahora</Link>
          </Button>
        </div>
      </div>
    </div>
  </div>
</section>
  );
}
