import { Navbar } from "@/components/common/navbar";
import { Features } from "@/components/common/sections/features";
import { FirstListForm } from "@/components/common/sections/first-list-form";
import { Footer } from "@/components/common/sections/footer";
import { Header } from "@/components/common/sections/header";
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
      {/* <FirstListForm /> */}
      <Features />
      {/* <NewsletterSection /> */}
      {/* <Pricing /> */}
      <Footer />
    </div>
  );
}
