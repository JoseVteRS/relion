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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://milistaderegalos.com"
  ),
  title: {
    default: config.appName,
    template: `%s | ${config.appName}`,
  },
  description: config.appDescription,
  keywords: [
    "regalos",
    "listas de regalos",
    "amigos",
    "regalos personalizados",
    "cumpleaños",
    "Navidad",
    "eventos",
    "deseos",
  ],
  authors: [{ name: "Jose Vicente" }],
  creator: "Jose Vicente",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: config.appName,
    title: config.appName,
    description: config.appDescription,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${config.appName} Logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@ImSilencio_",
    creator: "@ImSilencio_",
    title: config.appName,
    description: config.appDescription,
    images: ["/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
