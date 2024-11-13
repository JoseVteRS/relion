import { protectServer } from "@/features/auth/utils";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { DashboadListsPageClient } from "./client";

export default async function DashboardListsPage() {
  const session = await protectServer();
  const locale = await getLocale();
  if (!session) redirect(`/${locale}/sign-in`);

  return <DashboadListsPageClient />;
}
