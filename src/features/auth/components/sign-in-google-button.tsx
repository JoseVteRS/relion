"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { FcGoogle } from "react-icons/fc";

export const SignInGoogleButton = () => {
  const locale = useLocale();
  const t = useTranslations("Auth.signUp");

  const onProviderSignin = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: `/${locale}/dashboard`,
      redirect: true,
    });
  };

  return (
    <Button
      variant="outline"
      size="lg"
      className="w-full relative"
      onClick={() => onProviderSignin("google")}
    >
      <FcGoogle
        className="mr-2 size-5 top-1/2 -translate-y-1/2 left-2.5 absolute"
        onClick={() => onProviderSignin("google")}
      />
       {t("signUpWithGoogle")}
    </Button>
  );
};
