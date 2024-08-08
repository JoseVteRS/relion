"use client";

import { ListIcon, Loader, Loader2, UserIcon } from "lucide-react";
import { CardPublicPresent } from "./card-public-present";
import { useGetPublicList } from "@/features/list/api/use-get-public-list";
import { useSession } from "next-auth/react";
import { UnauthorizedUser } from "./unauthorized-user";
import { useRouter } from "next/navigation";
import { NoSee } from "./no-see";
import { useCookie, useLocalStorage } from "react-use";

interface ListProps {
  id?: string;
}

export const List = ({ id }: ListProps) => {
  const authUser = useSession();
  const [guestId] = useCookie("project-l");


  // if (authUser.status === "unauthenticated" && !guestId) {
  //   return <UnauthorizedUser listId={id ?? ""} />;
  // }

  const { data: list, isLoading } = useGetPublicList(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="size-10 animate-spin" />
      </div>
    );
  }

  const isUserOwner = authUser.data?.user?.id === list?.userId;

  if (!list || isUserOwner) {
    return <NoSee />;
  }

  return (
    <div className="relative">
      <header className="flex flex-col items-start justify-start gap-2">
        <div className="flex items-center gap-2">
          <ListIcon />
          <span className="text-lg font-bold">{list.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <UserIcon />
          <span className="text-lg font-bold">{list.user.name}</span>
        </div>
      </header>
      <div className="mt-5 flex flex-col gap-2">
        {list.presents!.map((present) => (
          <CardPublicPresent key={present.id} present={present} />
        ))}
      </div>
    </div>
  );
};
