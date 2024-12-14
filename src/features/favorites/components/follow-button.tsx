"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HeartIcon } from "lucide-react";
import { useGetFavorite } from "../api/use-get-favorite";

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
    return (
      <HeartIcon className="animate-pulse size-6 fill-white/30 stroke-none  rounded" />
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      {data ? (
        <button
          onClick={() => onUnfollow(listId)}
          aria-label="Unfollow list"
          className="hover:bg-transparent"
        >
          <HeartIcon className="size-6 fill-red-500 stroke-red-500" />
        </button>
      ) : (
        <button
          onClick={() => onFollow(listId)}
          aria-label="Follow list"
          className="hover:bg-transparent"
        >
          <HeartIcon className="size-6" />
        </button>
      )}
    </>
  );
};
