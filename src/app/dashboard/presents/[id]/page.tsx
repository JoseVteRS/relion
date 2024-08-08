"use client";

import { StatusBadge } from "@/components/common/status-badge";
import { useGetUserList } from "@/features/list/api/use-get-user-list";
import { useGetUserPresent } from "@/features/present/api/use-get-user-present";
import { ListIcon } from "lucide-react";

interface SinglePresentPageProps {
  params: {
    id: string;
  };
}

export default function SinglePresentPage({ params }: SinglePresentPageProps) {
  const presentId = params.id;

  const { data, isLoading } = useGetUserPresent(presentId);

  console.log({ data });

  return (
    <div className="min-h-screen">
      {isLoading && <p>Loading...</p>}
      <div>
        <header className="flex items-center justify-between gap-2 mb-5">
          <h1 className="text-neutral-100 font-bold text-4xl">{data?.name}</h1>
          <StatusBadge status={data?.status || false} className="size-6" />
        </header>
      </div>

      <div className="flex items-center gap-2">
        <ListIcon className="size-6" />
        <div className="text-lg">
          {Array.isArray(data?.list) ? (
            data?.list.map((item) => <div key={item.id}>{item.name}</div>)
          ) : (
            <div className="text-red-400">Sin lista</div>
          )}
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <h2 className="text-lg font-bold">Descripción</h2>
        {data?.description && (
          <p className="text-neutral-300 text-md leading-tight">
            {data?.description}
          </p>
        )}
      </div>
    </div>
  );
}
