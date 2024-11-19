import { auth } from "@/auth";
import { Modals } from "@/components/common/modals";
import QueryProvider from "@/components/providers/query-provider";
import SheetProvider from "@/components/providers/sheet-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import config from "../../../config/config";
import "../globals.css";

import { PHProvider } from "@/components/providers/posthog-provider";
import dynamic from "next/dynamic";

const PostHogPageView = dynamic(() => import("@/lib/posthog-pageview"), {
  ssr: false,
});

const inter = Manrope({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://relion.app/es/"
  ),
  title: {
    default: config.appTitle,
    template: `%s | ${config.appName}`,
  },
  description: config.appDescription,
  icons: {
    icon: "/favicon.svg",
  },
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
  authors: [{ name: "Relion" }],
  creator: "Relion",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/es/",
    siteName: config.appName,
    title: config.appTitle,
    description: config.appDescription,
    images: [
      {
        url: "/home/og-image.webp",
        width: 1200,
        height: 630,
        alt: `${config.appName} Logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@ImSilencio_",
    title: config.appTitle,
    description: config.appDescription,
    images: ["/home/og-image.webp"],
    site: "@ImSilencio_",
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
  }
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const session = await auth();

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  return (
    <SessionProvider session={session}>
      <html lang={locale} suppressHydrationWarning>
        {process.env.NODE_ENV === "development" && (
          <script src="https://unpkg.com/react-scan/dist/auto.global.js" async />
        )}
        <PHProvider>
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
                <NextIntlClientProvider messages={messages}>
                  <PostHogPageView />
                  {children}
                </NextIntlClientProvider>
                {/* <ReactQueryDevtools initialIsOpen={false} /> */}
              </QueryProvider>
            </ThemeProvider>
          </body>
        </PHProvider>
      </html>
    </SessionProvider>
  );
}
