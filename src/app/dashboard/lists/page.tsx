"use client";

import { TitlePage } from "@/components/common/page-title";
import { Button } from "@/components/ui/button";
import { CardList } from "@/features/list/components/card-list";
import { useNewListStateSheet } from "@/features/list/hooks/use-new-list";
import { Plus } from "lucide-react";
import { useGetUserLists } from "@/features/list/api/use-get-user-lists";
import { ListNotFound } from "@/features/list/components/list-not-found";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";
import { ListWithUserWithPresents } from "@/types/types";
import { ListsLoader } from "@/features/list/components/lists-loader";
import { useMemo } from "react";
import { CardListSkeleton } from "@/features/list/components/card-list-skeleton";

export default function ListPage() {
  const openNewlistSheet = useNewListStateSheet();
  const { data: lists, isLoading, isError } = useGetUserLists();
  const { shouldBlock, hasReachedListLimit, triggerPaywall } = usePaywall();

  const onCreateList = () => {
    if (hasReachedListLimit || shouldBlock) {
      triggerPaywall();
      return;
    }
    openNewlistSheet.onOpen();
  };

  const onDelete = () => {
    const ok = confirm();

    if (ok) {
      console.log("borrar regalo");
    }
  };

  const onEdit = () => {
    openNewlistSheet.onOpen();
  };

  const formattedLists = useMemo(() => {
    return lists?.map((list) => ({
      ...list,
      createdAt: list.createdAt ? new Date(list.createdAt) : null,
      updatedAt: list.updatedAt ? new Date(list.updatedAt) : null,
      eventDate: new Date(list.eventDate),
    }));
  }, [lists]);

  return (
    <div className="">
     <header className="flex items-center justify-between mb-10">
        <TitlePage>Listas</TitlePage>
        <Button
          variant="default"
          size="sm"
          className=""
          onClick={() => openNewlistSheet.onOpen()}
        >
          <Plus className="size-4" />
          Añadir lista
        </Button>
      </header>

      <div className="h-full flex flex-col md:grid md:grid-cols-3 gap-3 overflow-hidden">
        {isLoading && (
          <>
            <CardListSkeleton />
            <CardListSkeleton />
            <CardListSkeleton />
          </>
        )}
        {isError && <div>Error</div>}
        {lists?.length === 0 && <ListNotFound />}

        {/* TODO: Fix type */}
        {lists?.map((list: any) => (
          <CardList key={list.id} list={list} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}
