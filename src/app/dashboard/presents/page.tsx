"use client";

import { TitlePage } from "@/components/common/page-title";
import { Button } from "@/components/ui/button";
import { useNewPresentSheetState } from "@/features/present/hooks/use-new-present";
import {
  CardPresent,
  PresentWithList,
} from "@/features/present/components/card-present";
import { useGetUserPresents } from "@/features/present/api/use-get-user-presents";
import { Plus } from "lucide-react";
import { CardPresentsSkeleton } from "@/features/present/components/card-presents-skeleton";
import { PresentNotFount } from "@/features/present/components/presents-no-found";
import { PresentIsLoadingSkeleton } from "@/features/present/components/present-loading-skeleton";

export default function PresentsPage() {
  const { data: presents, isLoading, isError } = useGetUserPresents();
  const openNewPresentSheet = useNewPresentSheetState();
  const onEdit = () => {
    openNewPresentSheet.onOpen();
  };

  return (
    <div>
      <header className="flex items-center justify-between mb-10">
        <TitlePage>Regalos</TitlePage>
        <Button
          variant="default"
          size="sm"
          onClick={() => openNewPresentSheet.onOpen()}
        >
          <Plus className="size-4" />
          Añadir regalo
        </Button>
      </header>

      {isLoading && <PresentIsLoadingSkeleton />}
      {isError && <div>Error</div>}
      {presents?.length === 0 && <PresentNotFount />}

      <div className="flex flex-col md:grid md:grid-cols-3 gap-3">
        {/* TODO: Fix type */}
        {presents?.map((present: any) => (
          <CardPresent key={present.id} present={present} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
}
