import { redirect } from "next/navigation";

import { SignInCard } from "@/features/auth/components/sign-in-card";

import { auth } from "@/auth";
import { getLocale } from "next-intl/server";

export const metadata = {
  title: "Iniciar Sesión - Relion",
  description: "Inicia sesión en tu cuenta de Relion para gestionar tus listas de regalos y eventos.",
  image: "/images/auth/sign-in.webp",
  author: "Relion",
  authors: [{ name: "Relion" }],
  creator: "Relion",
  twitter: {
    card: "summary_large_image",
    creator: "@ImSilencio_",
    title: "Iniciar Sesión - Relion",
    description: "Inicia sesión en tu cuenta de Relion para gestionar tus listas de regalos y eventos.",
    images: ["/images/auth/sign-in.webp"],
    site: "@ImSilencio_",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/es/",
    siteName: "Relion",
    title: "Iniciar Sesión - Relion",
    description: "Inicia sesión en tu cuenta de Relion para gestionar tus listas de regalos y eventos.",
    images: [
      {
        url: "/images/auth/sign-in.webp",
        width: 1200,
        height: 630,
        alt: "Imagen de inicio de sesión en Relion",
      },
    ],
  },
};


const SignInPage = async () => {
  const session = await auth();
  const locale = await getLocale();

  if (session) {
    redirect(`/${locale}/dashboard`, );
  }

  return <SignInCard />; 
};

export default SignInPage;
