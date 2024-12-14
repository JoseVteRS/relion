import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DashboardOnboardingPageClient } from "./page-client";

export default async function DashboardOnboardingPage() {
  const session = await auth();

  if (!session) {
    return redirect("/es/sign-in");
  }

  return <DashboardOnboardingPageClient session={session} />;
}
