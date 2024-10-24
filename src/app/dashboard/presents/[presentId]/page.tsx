import { protectServer } from "@/features/auth/utils";
import { redirect } from "next/navigation";
import DashboardPresentPageClient from "./client";

interface DashboardPresentPageProps {
  params: {
    presentId: string;
  };
}

export default async function DashboardPresentPage({ params }: DashboardPresentPageProps) {
  const session = await protectServer()
  if(!session) redirect("/sign-in")
    return (<DashboardPresentPageClient params={params} />);
}
