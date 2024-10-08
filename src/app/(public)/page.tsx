import { Header } from "@/components/common/sections/header";
import { FirstListForm } from "@/components/common/sections/first-list-form";
import { Features } from "@/components/common/sections/features";

export default function Home() {
  return (
    <main className="bg-gray-900 text-white">
      <Header />
      <FirstListForm />
      <Features />
      {/* <NewsletterSection /> */}
      {/* <Pricing /> */}
    </main>
  );
}
