import { protectServer } from "@/features/auth/utils";
import { redirect } from "next/navigation";
import { DashboadListsPageClient } from "./client";

export default async function DashboardListsPage() {
  const session = await protectServer();
  if (!session) redirect("/sign-in");
  
  return <DashboadListsPageClient />;
}
