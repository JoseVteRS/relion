import React from "react";
import { CardListSkeleton } from "./card-list-skeleton";

export const ListsLoader = ({ isLoading }: { isLoading: boolean }) => {
  if (!isLoading) return null;
  return (
    <div className="max-h-screen overflow-hidden ">
      {isLoading && (
        <div className="relative overflow-hidden">
          <CardListSkeleton />
          <CardListSkeleton />
          <CardListSkeleton />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
    </div>
  );
};
