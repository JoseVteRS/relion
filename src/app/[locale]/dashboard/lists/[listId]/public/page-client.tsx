"use client";

import { CardPublicPresent } from "@/components/card-public-present";
import { HeaderListPublic } from "@/components/header-list-public";
import { useGetListPublic } from "@/features/list/api/use-get-list-public";
import { CardPresentsSkeleton } from "@/features/present/components/card-presents-skeleton";
import { ListWithUserWithPresents } from "@/types/types";
import { Present } from "@prisma/client";
import { parseISO } from "date-fns";
import { GiftIcon, Loader, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

interface PublicListPageProps {
  params: {
    listId: string;
  };
}

const parseDates = (list: any): ListWithUserWithPresents => ({
  ...list,
  createdAt: list.createdAt ? parseISO(list.createdAt) : null,
  updatedAt: list.updatedAt ? parseISO(list.updatedAt) : null,
  eventDate: parseISO(list.eventDate),
});

export default function PublicListPageClient({
  params: { listId },
}: PublicListPageProps) {
  const session = useSession();
  const authUserId = useMemo(() => session?.data?.user?.id, [session]);

  const t = useTranslations("Dashboard.Presents.presentShared");

  const { data: list, isLoading, isError, error } = useGetListPublic(listId);

  const isExpired = useMemo(
    () => list?.eventDate && new Date(list.eventDate) < new Date(),
    [list?.eventDate]
  );

  if (!authUserId) {
    return <div>No autorizado</div>;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="size-6 animate-spin" />
      </div>
    );
  }

  if (isError && error?.message) {
    return (
      <div className="flex justify-center items-center bg-red-800/30 p-5 rounded">
        <div className="flex flex-col items-center gap-2">
          <div className="text-5xl">🙈</div>
          <p className="text-xl">No puedes ver tu propia lista</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {list && <HeaderListPublic list={parseDates(list)} userId={authUserId} />}

      <div className="mt-5 flex flex-col gap-2">
        {isLoading && (
          <>
            <CardPresentsSkeleton />
            <CardPresentsSkeleton />
            <CardPresentsSkeleton />
          </>
        )}

        <div className="relative h-full">
          {isExpired && (
            <>
              <div className="absolute inset-0 h-full w-full bg-black/70 pointer-events-auto z-[99]"></div>
              <div className="absolute inset-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-full h-full z-[1]">
                <div className="flex flex-col items-center justify-center gap-2 text-center text-white">
                  <div className="text-5xl font-bold">Lista expirada</div>
                  <div className="text-sm">
                    La lista ha expirado, ya no puedes elegir regalos
                  </div>
                </div>
              </div>
            </>
          )}

          {list?.presents?.length === 0 && (
            <div className="flex justify-center items-center h-full">
              <div className="flex flex-col items-center gap-2">
                <GiftIcon className="size-6 text-muted-foreground" />
                <p className="text-lg text-secondary-foreground">
                  {t("noPresents", { userName: list.owner.name })}
                </p>
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-5">
            {list?.presents?.map((present) => (
              <CardPublicPresent
                key={present.id}
                present={{
                  ...present,
                  createdAt: new Date(present.createdAt),
                  updatedAt: new Date(present.updatedAt),
                }}
                listId={listId}
                authUserId={authUserId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
