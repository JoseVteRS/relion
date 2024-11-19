"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import LogoDark from "./logo/logo-dark";
import LogoLight from "./logo/logo-light";

export default function ErrorPage(props: {
  title: React.ReactNode;
  description?: React.ReactNode;
  secondaryDescription?: React.ReactNode;
  redirectUrl: string;
  redirectText: string;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 space-y-4">
      <main className="max-w-lg flex flex-col gap-4 items-center text-center">
        <LogoLight  />

        <h1>{props.title}</h1>

        <p>{props.description}</p>

        <Button onClick={() => router.push(props.redirectUrl)}>
          {props.redirectText}
        </Button>

        {props.secondaryDescription && <p>{props.secondaryDescription}</p>}
      </main>
    </div>
  );
}
