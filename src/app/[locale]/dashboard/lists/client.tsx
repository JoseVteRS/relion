"use client";

import { TitlePage } from "@/components/common/page-title";
import { Button } from "@/components/ui/button";
import { useGetUserLists } from "@/features/list/api/use-get-user-lists";
import { CardList } from "@/features/list/components/card-list";
import { ListsNotFound } from "@/features/list/components/lists-not-found";
import { useCreateListModal } from "@/features/list/hooks/use-create-list-modal";
import { PresentIsLoadingSkeleton } from "@/features/present/components/present-loading-skeleton";
import { PresentNotFount } from "@/features/present/components/presents-no-found";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

export function DashboadListsPageClient() {
  const { open: openCreateListModal } = useCreateListModal();
  const { data: lists, isLoading, isError } = useGetUserLists();

  const t = useTranslations("Dashboard.Lists");

  if (!lists || lists.length === 0) {
    return <ListsNotFound />;
  }

  return (
    <div>
      <header className="flex items-center justify-between mb-10">
        <TitlePage>{t("titleSection")}</TitlePage>
        <Button size="sm" onClick={openCreateListModal}>
          <Plus className="size-4" />
          {t("form.title")}
        </Button>
      </header>
      {isLoading && <PresentIsLoadingSkeleton />}
      {isError && (
        <div className="h-full flex items-center justify-center">
          {t("error")}
        </div>
      )}
      {lists?.length === 0 && <PresentNotFount />}

      <div className="flex flex-col md:grid md:grid-cols-3 gap-3">
        {lists?.map((list: any) => (
          <CardList key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
}
