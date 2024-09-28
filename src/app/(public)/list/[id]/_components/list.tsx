"use client";

import { Loader2 } from "lucide-react";
import { CardPublicPresent } from "./card-public-present";
import { CardPresentsSkeleton } from "@/features/present/components/card-presents-skeleton";
import { usePublicList } from "@/features/list/api/use-get-list-public";
import { ErrorMessageComponent } from "@/components/common/error-message";
import { HeaderListPublic } from "./header-list-public";
import { parseISO } from "date-fns";
import { ListWithUserWithPresents } from "@/types/types";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

interface ListProps {
  listId?: string;
}

const parseDates = (list: any): ListWithUserWithPresents => ({
  ...list,
  createdAt: list.createdAt ? parseISO(list.createdAt) : null,
  updatedAt: list.updatedAt ? parseISO(list.updatedAt) : null,
  eventDate: parseISO(list.eventDate),
});

export const List = ({ listId }: ListProps) => {
  const session = useSession();
  const authUserId = useMemo(() => session?.data?.user?.id, [session]);

  const { data, isLoading, isError, error } = usePublicList(listId);
  const list = data?.listData;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="size-10 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center bg-red-800/30 p-5 rounded">
        <ErrorMessageComponent
          message={error.message}
          callbackUrl={`${process.env.NEXT_PUBLIC_APP_URL}/list/${listId}`}
        />
      </div>
    );
  }

  return (
    <div className="relative">
      {list && <HeaderListPublic list={parseDates(list)} />}

      <div className="mt-5 flex flex-col gap-2">
        {isLoading && (
          <>
            <CardPresentsSkeleton />
            <CardPresentsSkeleton />
            <CardPresentsSkeleton />
          </>
        )}

        {list?.presents?.map((present) => (
          <CardPublicPresent
            key={present.id}
            present={present}
            listId={listId}
            authUserId={authUserId}
          />
        ))}
      </div>
    </div>
  );
};
