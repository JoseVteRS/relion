"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useSignUp } from "@/features/auth/hooks/use-sign-up";
import { Loader2, TriangleAlert } from "lucide-react";
import { signIn } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { FormEvent, useState } from "react";
import { FcGoogle } from "react-icons/fc";

export const SignUpCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const searchParams = useSearchParams();

  const t = useTranslations("Auth.signUp");
  const locale = useLocale();
  const posthog = usePostHog();

  const mutation = useSignUp();

  const callbackUrl = searchParams.get("callbackUrl");

  const onProviderSignin = (provider: "google" | "github") => {
    posthog.capture("signup_with_provider", { provider });
    signIn(provider, {
      callbackUrl: callbackUrl
        ? callbackUrl
        : `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/dashboard`,
      redirect: true,
    });
  };

  const onCredentialsSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    posthog.capture("signup_with_credentials");
    mutation.mutate(
      {
        name,
        email,
        password,
      },
      {
        onSuccess: () => {
          posthog.capture("signup_success", {
            provider: "Credentials",
          });
          signIn("credentials", {
            email,
            password,
            callbackUrl: callbackUrl
              ? callbackUrl
              : `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/dashboard`,
            redirect: true,
          });
        },
      }
    );
  };

  return (
    <Card className="w-full h-full p-8 bg-background border-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("subtitle")}</CardDescription>
      </CardHeader>
      {!!mutation.error && (
        <div className="bg-destructive/60 text-red-200 p-3 rounded-md flex items-center gap-x-2 text-sm mb-6">
          <TriangleAlert />
          <p>{t("error")}</p>
        </div>
      )}
      <CardContent className="space-y-4 px-0 pb-0">
        <form onSubmit={onCredentialsSignUp} className="space-y-4">
          <Input
            disabled={mutation.isPending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("name")}
            type="text"
            required
            min={3}
            max={100}
          />
          <Input
            disabled={mutation.isPending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("email")}
            type="email"
            required
          />
          <Input
            disabled={mutation.isPending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("password")}
            type="password"
            required
            min={8}
          />

          <Button
            disabled={mutation.isPending}
            type="submit"
            className="w-full"
            size="lg"
          >
            {t("signUp")}
            {mutation.isPending && (
              <Loader2 className="ml-2 size-4 animate-spin durarion-75" />
            )}
          </Button>
        </form>

        <Separator orientation="horizontal" />

        <div>
          <Button
            disabled={mutation.isPending}
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
        </div>
        <p className="text-sm text-muted-foreground">
          {t("alreadyHaveAccount")}{" "}
          <Link href={`/${locale}/sign-in`}>
            <span className="text-primary underline">{t("signInLink")}</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
