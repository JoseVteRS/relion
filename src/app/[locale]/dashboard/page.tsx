import { protectServer } from "@/features/auth/utils";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import DashboardPageClient from "./page-client";

export default async function DashboardPage() {
  const session = await protectServer();
  const locale = await getLocale();

  if (!session) {
    redirect(`/${locale}/sign-up?callbackUrl=/${locale}/dashboard`);
  }

  return <DashboardPageClient />;
}
