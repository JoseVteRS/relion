import { Features } from "@/components/common/sections/features";
import { FirstListForm } from "@/components/common/sections/first-list-form";
import { Header } from "@/components/common/sections/header";
import { protectServer } from "@/features/auth/utils";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await protectServer();
  if (session) {
    redirect("/dashboard");
  }

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
