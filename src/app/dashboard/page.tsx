import { TitlePage } from "@/components/common/page-title";
import { protectServer } from "@/features/auth/utils";
import { CardInfoList } from "./_components/card-info-list";
import { CardInfoPresent } from "./_components/card-info-present";

export default async function DashboardPage() {
  await protectServer();
  return (
    <div className="min-h-screen">
      <TitlePage>Escritorio</TitlePage>

      <div className="flex flex-col gap-4 mt-5">
        <CardInfoList />
        <CardInfoPresent />
      </div>
    </div>
  );
}
