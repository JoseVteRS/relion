import { auth } from "@/auth";
import { SignUpCard } from "@/features/auth/components/sign-up-card";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const session = await auth();
  const locale = await getLocale();

  if (session) {
    redirect(`/${locale}/dashboard`);
  }
  return <SignUpCard />;
}
