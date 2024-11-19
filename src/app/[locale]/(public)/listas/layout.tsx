import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/sections/footer";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { getLocale } from "next-intl/server";
import Link from "next/link";

export default async function ListasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  return (
    <section>
      <Navbar />
      <article className="max-w-screen-2xl mx-auto my-20 lg:my-32 border bg-zinc-950 p-8 rounded-lg">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/${locale}/listas`} rel="index follow">
            <ArrowLeftIcon />
            Volver
          </Link>
        </Button>

        {children}

        <footer></footer>
      </article>
      <Footer />
    </section>
  );
}
