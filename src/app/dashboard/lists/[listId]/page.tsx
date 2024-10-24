import { DashboardListDetailsPageClient } from "./client";

interface ListDetailPageProps {
  params: {
    listId: string;
  };
}

export default function DashboardListDetailsPage({
  params: { listId },
}: ListDetailPageProps) {
  return <DashboardListDetailsPageClient id={listId} />;
}
