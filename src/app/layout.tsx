import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SheetProvider from "@/components/providers/sheet-provider";
import QueryProvider from "@/components/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Regalame",
  description: "Crea listas de regalos para tus amigos y que te regalen lo que te gusta",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en" className="light">
        <body className={`${inter.className}`}>
          <QueryProvider>
            <SheetProvider />
            <Toaster position="top-center" />
            {children}
          </QueryProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
