import { TitlePage } from "@/components/common/page-title";
import { protectServer } from "@/features/auth/utils";
import { CardInfoList } from "./_components/card-info-list";
import { CardInfoPresent } from "./_components/card-info-present";
import { FirstListButton } from "./_components/first-list";

export default async function DashboardPage() {
  await protectServer();
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <TitlePage>Escritorio</TitlePage>
        <FirstListButton />
      </div>

      <div className="flex flex-col md:flex-row gap-4 mt-5">
        <CardInfoList />
        <CardInfoPresent />
      </div>
    </div>
  );
}
