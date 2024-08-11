"use client";

import { TitlePage } from "@/components/common/page-title";
import { Button } from "@/components/ui/button";
import { useNewPresentSheetState } from "@/features/present/hooks/use-new-present";
import { CardPresent } from "@/features/present/components/card-present";
import { useGetUserPresents } from "@/features/present/api/use-get-user-presents";
import { Plus } from "lucide-react";
import { CardPresentsSkeleton } from "@/features/present/components/card-presents-skeleton";
import { PresentNotFount } from "@/features/present/components/presents-no-found";

export default function PresentsPage() {
  const { data: presents, isLoading, isError } = useGetUserPresents();
  const openNewlistSheet = useNewPresentSheetState();
  const onEdit = () => {
    openNewlistSheet.onOpen();
  };

  return (
    <div className="bg-background min-h-screen">
      <header className="flex items-center justify-between mb-10 sticky top-0 py-5 bg-background">
        <TitlePage>Regalos</TitlePage>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-neutral-800 bg-primary text-sm"
          onClick={() => openNewlistSheet.onOpen()}
        >
          <Plus className="size-4" />
        </Button>
      </header>

      <div className="flex flex-col gap-3">
        {isLoading && (
          <>
            <CardPresentsSkeleton />
            <CardPresentsSkeleton />
            <CardPresentsSkeleton />
          </>
        )}
        {isError && <div>Error</div>}
        {presents?.length === 0 && <PresentNotFount />}
        {presents?.map((present) => (
          <CardPresent key={present.id} present={present} onEdit={onEdit} />
        ))}
      </div>
    </div>
  );
}
