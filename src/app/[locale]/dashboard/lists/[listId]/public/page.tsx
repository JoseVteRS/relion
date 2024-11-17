import { protectServer } from "@/features/auth/utils";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import PublicListPageClient from "./page-client";

interface PublicListPageProps {
  params: {
    listId: string;
  };
}

export default async function PublicListPage({ params }: PublicListPageProps) {
  const session = await protectServer();
  const locale = await getLocale();

  if (!session) {
    return redirect(
      `/${locale}/sign-in?callbackUrl=/${locale}/dashboard/lists/${params.listId}/public`
    );
  }

  return <PublicListPageClient params={params} />;
}
