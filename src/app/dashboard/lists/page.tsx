"use client";

import { TitlePage } from "@/components/common/page-title";
import { Button } from "@/components/ui/button";
import { CardList } from "@/features/list/components/card-list";
import { useNewListStateSheet } from "@/features/list/hooks/use-new-list";
import { Plus } from "lucide-react";
import { useGetUserLists } from "@/features/list/api/use-get-user-lists";
import { CardListSkeleton } from "@/features/list/components/card-list-skeleton";
import { ListNotFound } from "@/features/list/components/list-not-found";

export default function ListPage() {
  const openNewlistSheet = useNewListStateSheet();
  const { data: lists, isLoading, isError } = useGetUserLists();

  console.log({ lists });

  const onDelete = () => {
    const ok = confirm();

    if (ok) {
      console.log("borrar regalo");
    }
  };

  const onEdit = () => {
    openNewlistSheet.onOpen();
  };

  return (
    <div className="bg-background min-h-screen">
      <header className="flex items-center justify-between mb-10 sticky top-0 py-5 bg-background">
        <TitlePage>Listas</TitlePage>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 text-neutral-800 bg-emerald-500 text-sm"
          onClick={() => openNewlistSheet.onOpen()}
        >
          <Plus className="size-4" />
        </Button>
      </header>

      <div className="flex flex-col gap-3">
        {isLoading && (
          <>
            <CardListSkeleton />
            <CardListSkeleton />
            <CardListSkeleton />
            <CardListSkeleton />
            <CardListSkeleton />
          </>
        )}
        {isError && <div>Error</div>}
        {lists?.length === 0 && <ListNotFound />}
        {lists?.map((list) => (
          <CardList
            key={list.id}
            list={list}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}
