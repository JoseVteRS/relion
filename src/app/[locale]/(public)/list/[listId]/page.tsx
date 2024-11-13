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

  if (session) {
    return redirect(`/${locale}/dashboard/lists/${params.listId}/public`);
  }

  return (
    <div className="min-h-screen">
      <List listId={params.listId} />
    </div>
  );
}
