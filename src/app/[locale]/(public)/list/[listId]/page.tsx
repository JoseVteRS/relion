import { protectServer } from "@/features/auth/utils";
import { redirect } from "next/navigation";
import { List } from "./_components/list";

interface PublicListPageProps {
  params: {
    listId: string;
  };
}

export default async function PublicListPage({ params }: PublicListPageProps) {
  const session = await protectServer();

  if (session) {
    redirect(`/dashboard/lists/${params.listId}/public`);
  }

  return (
    <div className="min-h-screen">
      <List listId={params.listId} />
    </div>
  );
}
