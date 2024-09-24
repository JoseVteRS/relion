"use client";

import { TitlePage } from "@/components/common/page-title";
import { Button } from "@/components/ui/button";
import { CardList } from "@/features/list/components/card-list";
import { useNewListStateSheet } from "@/features/list/hooks/use-new-list";
import { Plus } from "lucide-react";
import { useGetUserLists } from "@/features/list/api/use-get-user-lists";
import { ListNotFound } from "@/features/list/components/list-not-found";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";
import { ListWithUserWithPresents } from "@/types/list-types";
import { ListsLoader } from "@/features/list/components/lists-loader";
import { useMemo } from "react";

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
    <div className="bg-background min-h-screen">
      <header className="flex items-center justify-between mb-10 sticky top-0 py-5 bg-background">
        <TitlePage>Listas</TitlePage>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-neutral-800 bg-primary text-sm"
          onClick={onCreateList}
        >
          <Plus className="size-4" />
        </Button>
      </header>

      <div className="h-full flex flex-col md:grid md:grid-cols-3 gap-3 overflow-hidden">
        <ListsLoader isLoading={isLoading} />

        {lists?.length === 0 && <ListNotFound />}
        {formattedLists?.map((list) => (
          <CardList
            key={list.id}
            list={list as ListWithUserWithPresents}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}
