import { protectServer } from "@/features/auth/utils";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { DashboardListDetailsPageClient } from "./client";

interface ListDetailPageProps {
  params: {
    listId: string;
  };
}

export default async function DashboardListDetailsPage({
  params: { listId },
}: ListDetailPageProps) {
  const session = await protectServer();
  const locale = await getLocale();
  if (!session) {
    return redirect(
      `/${locale}/sign-in?callbackUrl=${encodeURIComponent(
        `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/dashboard/lists/${listId}`
      )}`
    );
  }

  return <DashboardListDetailsPageClient id={listId} />;
}
