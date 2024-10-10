"use client";

import { HeartIcon } from "lucide-react";
import { useGetFavorite } from "../api/use-get-favorite";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FollowButtonProps {
  onFollow: (listId: string) => void;
  onUnfollow: (listId: string) => void;
  listId: string;
}

export const FollowButton = ({
  listId,
  onFollow,
  onUnfollow,
}: FollowButtonProps) => {
  const { data, isLoading, isError } = useGetFavorite({ listId });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      {data ? (
        <Button
          onClick={() => onUnfollow(listId)}
          variant="ghost"
          size="icon"
          className="hover:bg-transparent"
        >
          <HeartIcon className="size-6 fill-red-500 stroke-red-500" />
        </Button>
      ) : (
        <Button
          onClick={() => onFollow(listId)}
          variant="ghost"
          size="icon"
          className="hover:bg-transparent"
        >
          <HeartIcon className="size-6" />
        </Button>
      )}
    </div>
  );
};
