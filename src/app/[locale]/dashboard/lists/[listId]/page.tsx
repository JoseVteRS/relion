import { protectServer } from "@/features/auth/utils";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { DashboardListDetailsPageClient } from "./client";

interface ListDetailPageProps {
  params: {
    listId: string;
  };
}

export default async function  DashboardListDetailsPage({
  params: { listId },
}: ListDetailPageProps) {
  const session = await protectServer();
  const locale = await getLocale();
  if (!session) {
    return redirect(`/${locale}/sign-in`);
  }

  return <DashboardListDetailsPageClient id={listId} />;
}
