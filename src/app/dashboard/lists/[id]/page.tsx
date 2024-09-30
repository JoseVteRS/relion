import { DashboardListDetails } from "./_components/list-details";

interface ListDetailPageProps {
  params: {
    id: string;
  };
}

export default function ListDetailPage({
  params: { id },
}: ListDetailPageProps) {
  return <DashboardListDetails id={id} />;
}
