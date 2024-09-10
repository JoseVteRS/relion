import { Navbar } from "@/components/common/navbar";
import { Pricing } from "@/components/common/sections/pricing";
import { Header } from "@/components/common/sections/header";
import { NewsletterSection } from "@/components/common/sections/newsletter";
import { Footer } from "@/components/common/sections/footer";

export default function Home() {
  return (
    <main className="bg-gray-900 text-white">
      <Header />
      <NewsletterSection />
      {/* <Pricing /> */}
    </main>
  );
}
