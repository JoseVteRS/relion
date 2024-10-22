import { TitlePage } from "@/components/common/page-title";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { CardInfoList } from "./_components/card-info-list";
import { CardInfoPresent } from "./_components/card-info-present";
import { FirstListButton } from "./_components/first-list";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/sign-in");

  
  return (
    <div className="">
      <div className="flex flex-col items-start justify-between">
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
