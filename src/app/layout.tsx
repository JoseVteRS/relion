import { auth } from "@/auth";
import { Modals } from "@/components/common/modals";
import QueryProvider from "@/components/providers/query-provider";
import SheetProvider from "@/components/providers/sheet-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import config from "../../config/config";
import "./globals.css";

// const LazyToaster = dynamic(
//   () => import("@/components/ui/sonner").then((mod) => mod.Toaster),
//   {
//     ssr: false,
//   }
// );

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://relion.app"
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
        url: "/images/og-image.webp",
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
    images: ["/images/og-image.webp"],
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
      <html lang="es" suppressHydrationWarning>
        <body className={cn(inter.className, "antialiased min-h-screen")}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>
              <SheetProvider />
              <Toaster richColors position="top-center" />
              <Modals />
              {children}
              {/* <ReactQueryDevtools initialIsOpen={false} /> */}
            </QueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
