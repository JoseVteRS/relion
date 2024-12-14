"use client";

import { TitlePage } from "@/components/common/page-title";
import { Button } from "@/components/ui/button";
import { useGetPresentsPrivate } from "@/features/present/api/use-get-presents-private";
import { CardPresent } from "@/features/present/components/card-present";
import { PresentIsLoadingSkeleton } from "@/features/present/components/present-loading-skeleton";
import { PresentNotFount } from "@/features/present/components/presents-no-found";
import { useCreatePresentModal } from "@/features/present/hooks/use-create-present-modal";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

export function PresentsPageClient() {
  const { data: presents, isLoading, isError } = useGetPresentsPrivate();
  const { open: openCreatePresentModal } = useCreatePresentModal();
  const commonPresents = useTranslations("Common.presents");
  const dashboardPresents = useTranslations("Dashboard.Presents");
  return (
    <div className="PresentsPageClient h-full">
      <header className="flex items-center justify-between mb-10">
        <TitlePage>{dashboardPresents("titleSection")}</TitlePage>
        <Button variant="default" size="sm" onClick={openCreatePresentModal}>
          <Plus className="size-4" />
          {commonPresents("add")}
        </Button>
      </header>

      {isLoading && <PresentIsLoadingSkeleton />}
      {isError && (
        <div className="h-full flex items-center justify-center">
          Ha ocurrido un error al cargar los regalos
        </div>
      )}
      {presents?.length === 0 && <PresentNotFount />}

      <div className="flex flex-col md:grid md:grid-cols-3 gap-3">
        {presents?.map((present: any) => (
          <CardPresent key={present.id} present={present} />
        ))}
      </div>
    </div>
  );
}
