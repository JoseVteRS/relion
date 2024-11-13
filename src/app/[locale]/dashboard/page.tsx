import { protectServer } from "@/features/auth/utils";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await protectServer();
  const locale = await getLocale();

  if (!session) {
    redirect(`/${locale}/sign-up`);
  } else {
    redirect(`/${locale}/dashboard/presents`);
  }
}
