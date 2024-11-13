"use client";
import { useGetUserLists } from "@/features/list/api/use-get-user-lists";
import { cn } from "@/lib/utils";
import { ListIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";
import { StatusBadge } from "./status-badge";

export const SidebarLists = () => {
  const {
    data: lists,
    isLoading: loadingLists,
    isError: errorLists,
  } = useGetUserLists();
  const dashboardSidebar = useTranslations("Dashboard.Sidebar");
  const locale = useLocale();

  if (loadingLists) {
    return (
      <div className="flex items-start justify-center h-full">
        <Skeleton />
      </div>
    );
  }

  if (lists?.length === 0) {
    return null;
  }

  const isActive = false;

  return (
    <div>
      <h3 className="text-xs font-bold text-muted-foreground px-7 mb-3 mt-10 uppercase">
        {dashboardSidebar("ListSectionTitle")}
      </h3>
      <ul className="flex flex-col gap-y-1 px-3">
        {lists?.map((list) => (
          <Link
            key={list.id}
            href={`/${locale}/dashboard/lists/${list.id}`}
            prefetch={true}
          >
            <div
              className={cn(
                "flex items-center px-3 py-3 rounded-md bg-transparent hover:bg-muted hover:text-foreground transition",
                isActive && "bg-background text-foreground transition"
              )}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center">
                  <ListIcon className="size-5 mr-2 stroke-2" />
                  <span className="text-sm font-medium">{list.name}</span>
                </div>
                <div>
                  <StatusBadge status={list.status as boolean} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};
