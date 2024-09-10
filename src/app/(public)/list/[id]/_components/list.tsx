"use client";

import { ListIcon, Loader2, UserIcon } from "lucide-react";
import { CardPublicPresent } from "./card-public-present";
import { useMemo } from "react";
import { CardPresentsSkeleton } from "@/features/present/components/card-presents-skeleton";
import { usePublicList } from "@/features/list/api/use-get-list-public";
import { NoSee } from "./no-see";
import { ErrorMessageComponent } from "@/components/common/error-message";
import { useSession } from "next-auth/react";

interface ListProps {
  listId?: string;
}

export const List = ({ listId }: ListProps) => {
  const authUser = useSession();
  const { data, isLoading, isError, error } = usePublicList(listId);
  const list = data?.listData;
  const presentsInList = data?.presentsData;

  const isUserOwner = useMemo(() => {
    const userId = authUser.data?.user?.id;
    const listOwnerId = list?.userId;
    return (
      userId !== undefined &&
      listOwnerId !== undefined &&
      userId === listOwnerId
    );
  }, [authUser.data?.user?.id, list?.userId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="size-10 animate-spin" />
      </div>
    );
  }

  if (isUserOwner) {
    return <NoSee />;
  }

  if (isError) {
    return (
      <ErrorMessageComponent
        message={error.message}
        callbackUrl={`${process.env.NEXT_PUBLIC_APP_URL}/list/${listId}`}
      />
    );
  }

  return (
    <div className="relative">
      <header className="flex flex-col items-start justify-start gap-2">
        <div className="flex items-center gap-2">
          <ListIcon />
          <span className="text-lg font-bold">{list?.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <UserIcon />
          <span className="text-lg font-bold">{list?.user.name}</span>
        </div>
      </header>
      <div className="mt-5 flex flex-col gap-2">
        {isLoading && (
          <>
            <CardPresentsSkeleton />
            <CardPresentsSkeleton />
            <CardPresentsSkeleton />
          </>
        )}

        {presentsInList?.map((present) => (
          <CardPublicPresent
            key={present.id}
            present={present}
            listId={listId}
          />
        ))}
      </div>
    </div>
  );
};
