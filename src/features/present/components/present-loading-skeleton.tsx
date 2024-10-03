"use client";

import { CardPresentsSkeleton } from "./card-presents-skeleton";

export const PresentIsLoadingSkeleton = () => {
  return (
    <div className="relative">
      <div className="flex flex-col md:grid md:grid-cols-3 gap-3">
        <CardPresentsSkeleton />
        <CardPresentsSkeleton />
        <CardPresentsSkeleton />
        <CardPresentsSkeleton />
        <CardPresentsSkeleton />
        <CardPresentsSkeleton />
        <CardPresentsSkeleton />
        <CardPresentsSkeleton />
        <CardPresentsSkeleton />
        <CardPresentsSkeleton />
        <CardPresentsSkeleton />
        <CardPresentsSkeleton />
      </div>
      <div className="absolute bottom-0 w-full h-[500px] bg-gradient-to-t from-background to-transparent"></div>
    </div>
  );
};
