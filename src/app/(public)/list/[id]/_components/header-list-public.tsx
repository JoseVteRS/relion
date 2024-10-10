import { Button } from "@/components/ui/button";
import { useCreateFollow } from "@/features/favorites/api/use-create-follow";
import { useUnfollow } from "@/features/favorites/api/use-unfollow";
import { FollowButton } from "@/features/favorites/components/follow-button";
import { ListWithUserWithPresents } from "@/types/types";
import { Separator } from "@radix-ui/react-select";
import { CalendarIcon, HeartIcon, InfoIcon, UserIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMemo } from "react";

interface HeaderListPublicProps {
  list: ListWithUserWithPresents;
  userId: string;
}

export const HeaderListPublic = ({ list, userId }: HeaderListPublicProps) => {
  const isExpired = useMemo(
    () => new Date(list.eventDate) > new Date(),
    [list.eventDate]
  );

  const follow = useCreateFollow({ listId: list.id, userId });
  const unFollow = useUnfollow({ listId: list.id, userId });

  return (
    <header className="bg-card/50 p-4 sm:p-6 rounded-lg shadow-sm mb-6">
      <div className="flex justify-end">
        <FollowButton
          listId={list.id}
          onFollow={() => follow.mutate({ listId: list.id })}
          onUnfollow={() => unFollow.mutate({ listId: list.id })}
        />
      </div>
      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground text-center">
          {list?.name}
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-muted-foreground text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <UserIcon className="size-4 sm:size-5" />
            <span>{list?.user.name}</span>
          </div>

          {list?.eventDate && (
            <div className="flex items-center gap-2">
              <CalendarIcon className="size-4 sm:size-5" />
              <time dateTime={list.eventDate.toISOString()}>
                {new Date(list.eventDate).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
              <Separator className="hidden sm:inline-block h-5 w-px bg-muted-foreground/50 mx-2" />
              <div className="flex items-center gap-2">
                {isExpired ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-500 text-green-200">
                    <span className="mr-1.5 h-2 w-2 rounded-full bg-green-400"></span>
                    Lista abierta
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500 text-red-100">
                    Evento pasado
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {list?.description && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-start gap-3 text-sm text-muted-foreground">
              <InfoIcon className="size-5 mt-0.5 flex-shrink-0" />
              <p className="flex-grow">{list.description}</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
