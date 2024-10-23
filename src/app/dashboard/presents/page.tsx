import { protectServer } from "@/features/auth/utils";
import { redirect } from "next/navigation";
import { PresentsPageClient } from "./client";

export default async function DashboardPresentPage() {
  const session = await protectServer();
  
  if (!session) redirect("/sign-in");

  return <PresentsPageClient />;
}
