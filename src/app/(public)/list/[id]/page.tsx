import { List } from "./_components/list";

interface PublicListPageProps {
  params: {
    id: string;
  };
}

export default function PublicListPage({
  params: { id },
}: PublicListPageProps) {
  return (
    <div className="min-h-screen">
      <List id={id} />
    </div>
  );
}
