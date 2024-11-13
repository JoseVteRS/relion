import { protectServer } from "@/features/auth/utils";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import DashboardPresentPageClient from "./client";

interface DashboardPresentPageProps {
  params: {
    presentId: string;
  };
}

export default async function DashboardPresentPage({
  params,
}: DashboardPresentPageProps) {
  const session = await protectServer();
  const locale = await getLocale();

  if (!session) redirect(`/${locale}/sign-in`);
  return <DashboardPresentPageClient params={params} />;
}
