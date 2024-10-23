import { protectServer } from "@/features/auth/utils";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await protectServer();
  if (!session) {
    redirect("/sign-up");
  } else {
    redirect("/dashboard/presents");
  }
}
