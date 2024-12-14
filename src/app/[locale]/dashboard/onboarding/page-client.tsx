"use client";

import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import Link from "next/link";
import React, { memo } from "react";

export const DashboardOnboardingPageClient = ({
  session,
}: {
  session: Session;
}) => {
  if (!session.user) return null;

  const userName = session.user.name?.split(" ")[0];

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-4">
      <h1 className="text-4xl font-bold mb-6">Hola, {userName}</h1>
      <p className="text-2xl text-center font-semibold mb-6">
        Crea tu primera lista
      </p>
      <div className="text-sm text-muted-foreground mb-6">
        <ol className="list-decimal text-xl space-y-2">
          <li className="flex items-center">
            <span className="mr-2 text-primary font-semibold">1.</span>
            <span>Crea una lista</span>
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-primary font-semibold ">2.</span>
            <span>Añade regalos</span>
          </li>
          <li className="flex items-center">
            <span className="mr-2 text-primary font-semibold">3.</span>
            <span>Comparte tu lista</span>
          </li>
        </ol>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <Button variant="default">
          <Link href="/es/dashboard/onboarding?create-list=true">
            Crear una Lista
          </Link>
        </Button>
      </div>
    </div>
  );
};
