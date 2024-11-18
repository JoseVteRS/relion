import { Navbar } from "@/components/common/navbar";
import { Features } from "@/components/common/sections/features";
import { Footer } from "@/components/common/sections/footer";
import { Header } from "@/components/common/sections/header";
import { LinkToBlog } from "@/components/common/sections/link-to-blog";
import { Testimonials } from "@/components/common/sections/testimonials";
import { protectServer } from "@/features/auth/utils";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await protectServer();
  const locale = await getLocale();
  if (session) {
    redirect(`${locale}/dashboard`);
  }

  return (
    <div className="bg-gray-900 text-white">
      <Navbar />

      <Header />
      <Features />
      <LinkToBlog />
      <Testimonials />
      <Footer />
    </div>
  );
}
