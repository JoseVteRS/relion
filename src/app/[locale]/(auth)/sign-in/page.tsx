import { redirect } from "next/navigation";

import { SignInCard } from "@/features/auth/components/sign-in-card";

import { auth } from "@/auth";
import { getLocale } from "next-intl/server";

const SignInPage = async () => {
  const session = await auth();
  const locale = await getLocale();

  if (session) {
    redirect(`/${locale}/dashboard`, );
  }

  return <SignInCard />; 
};

export default SignInPage;
