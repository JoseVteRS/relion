"use client";

import { SidebarLists } from "@/components/common/sidebar-lists";
import { GiftIcon, HeartIcon, HomeIcon, ListIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";

export const SidebarRoutes = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-y-4 flex-1 pt-3">
      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem
          href="/dashboard"
          label="Escritorio"
          icon={HomeIcon}
          isActive={pathname === "/dashboard"}
        />
        <SidebarItem
          href="/dashboard/presents"
          label="Tus regalos"
          icon={GiftIcon}
          isActive={pathname === "/dashboard/presents"}
        />
        <SidebarItem
          href="/dashboard/lists"
          label="Tus listas"
          icon={ListIcon}
          isActive={pathname === "/dashboard/lists"}
        />
        <SidebarItem
          href="/dashboard/favorite-lists"
          label="Listas favoritas"
          icon={HeartIcon}
          isActive={pathname === "/dashboard/favorite-lists"}
        />
      </ul>
      {/* <Separator /> */}
      <SidebarLists />
    </div>
  );
};
