import { protectServer } from "@/features/auth/utils";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { PresentsPageClient } from "./client";

export default async function DashboardPresentsPage() {
  const session = await protectServer();
  const locale = await getLocale();

  if (!session)
    redirect(
      `${
        process.env.NEXT_PUBLIC_APP_URL
      }/${locale}/sign-in?callbackUrl=${encodeURIComponent(
        `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/dashboard/presents`
      )}`
    );

  return <PresentsPageClient />;
}
