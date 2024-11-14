"use client";

import { StatusBadge } from "@/components/common/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetUserPresent } from "@/features/present/api/use-get-user-present";
import { UpdatePresentForm } from "@/features/present/forms/edit-form-present";
import { Present } from "@/features/present/types";
import { ArrowLeftIcon, Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { useRouter } from "next/navigation";

interface DashboardPresentPageClientProps {
  params: {
    presentId: string;
  };
}

export default function DashboardPresentPageClient({
  params,
}: DashboardPresentPageClientProps) {
  const router = useRouter();

  const t = useTranslations("Dashboard.Presents.editScreen");
  const locale = useLocale();

  const {
    data: present,
    isLoading: loadingPresent,
    isError,
    error,
  } = useGetUserPresent({ presentId: params.presentId });

  if (loadingPresent) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (isError && error instanceof Error && error.cause === 401) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">404 - No encontrado</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Lo sentimos, el regalo que buscas no existe.
          </p>
          <Button
            variant="outline"
            onClick={() => router.push(`/${locale}/dashboard/presents`)}
          >
            Volver a la lista de regalos
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card className="bg-white dark:bg-background">
      <Button
        className="w-fit"
        size="sm"
        variant="secondary"
        onClick={() => router.back()}
      >
        <ArrowLeftIcon className="w-5 h-5" />
        Volver
      </Button>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {t("title", { presentName: present?.present.name })}
          <StatusBadge status={present?.present.status || false} />
        </CardTitle>
        <div className="flex flex-row items-start gap-1 pt-5">
          <span className="text-sm text-muted-foreground">Creado el:</span>
          <div className="text-sm font-medium">
            {new Date(present?.present?.createdAt || "").toLocaleDateString(
              "es-ES",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {present && (
          <UpdatePresentForm initialValues={present.present as Present} />
        )}
      </CardContent>
    </Card>
  );
}
