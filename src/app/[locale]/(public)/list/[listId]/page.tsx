import { protectServer } from "@/features/auth/utils";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { List } from "./_components/list";

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
      `/${locale}/sign-in?callbackUrl=${encodeURIComponent(
        `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/dashboard/lists/${params.listId}/public`
      )}`
    );
  }

  redirect(`/${locale}/dashboard/lists/${params.listId}/public`);
}
