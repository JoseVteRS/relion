"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { useSignUp } from "@/features/auth/hooks/use-sign-up";
import { Loader2, TriangleAlert } from "lucide-react";

export const SignUpCard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const mutation = useSignUp();

  const onProviderSignin = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: "/dashboard",
      redirect: true,
    });
  };

  const onCredentialsSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(
      {
        name,
        email,
        password,
      },
      {
        onSuccess: () => {
          signIn("credentials", {
            email,
            password,
            callbackUrl: "/dashboard",
            redirect: true,
          });
        },
      }
    );
  };

  return (
    <Card className="w-full h-full p-8 bg-background border-none">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      {!!mutation.error && (
        <div className="bg-destructive/60 text-red-200 p-3 rounded-md flex items-center gap-x-2 text-sm mb-6">
          <TriangleAlert />
          <p>Invalid email or password</p>
        </div>
      )}
      <CardContent className="space-y-4 px-0 pb-0">
        <form onSubmit={onCredentialsSignUp} className="space-y-4">
          <Input
            disabled={mutation.isPending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            type="text"
            required
            min={3}
            max={100}
          />
          <Input
            disabled={mutation.isPending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            disabled={mutation.isPending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
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
            Continue
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
            Continue with Google
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in">
            <span className="text-primary underline">Sign in</span>
          </Link>
        </p>
      </CardContent>
    </Card>
  );
};
