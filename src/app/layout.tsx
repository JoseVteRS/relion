import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import SheetProvider from "@/components/providers/sheet-provider";
import QueryProvider from "@/components/providers/query-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { auth } from "@/auth";
import { Modals } from "@/components/common/modals";
import { Navbar } from "@/components/common/navbar";
import config from "../../config/config";

const LazyToaster = dynamic(
  () => import("@/components/ui/sonner").then((mod) => mod.Toaster),
  {
    ssr: false,
  }
);

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: config.appName,
  description:
    config.appDescription,
  keywords:
    "regalos, listas de regalos, amigos, regalos personalizados, cumpleaños, Navidad",
  authors: {
    name: "Jose Vicente",
  },
  openGraph: {
    title: config.appName,
    description:
      config.appDescription,
    url: "https://www.regalante.vercel.app",
    type: "website",
    images: [
      {
        url: "https://www.regalante.vercel.app/og-image.jpg",
        width: 800,
        height: 600,
        alt: `${config.appName} Logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@JoseVteRiSo",
    title: config.appName,
    description:
      config.appDescription,
    images: "https://www.regalante.vercel.app/twitter-image.jpg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en" className="dark">
        <body className={`${inter.className}`}>
          <QueryProvider>
            <SheetProvider />
            <LazyToaster richColors position="top-center" />
            <Modals />
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
