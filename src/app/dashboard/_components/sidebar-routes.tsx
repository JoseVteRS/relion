"use client";

import { usePathname } from "next/navigation";
import { BoxIcon, GiftIcon, HomeIcon, ListIcon } from "lucide-react";
import { SidebarItem } from "./sidebar-item";

export const SidebarRoutes = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-y-4 flex-1">
      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem
          href="/dashboard"
          label="Escritorio"
          icon={HomeIcon}
          isActive={pathname === "/dashboard"}
        />
        <SidebarItem
          href="/dashboard/presents"
          label="Regalos"
          icon={GiftIcon}
          isActive={pathname === "/dashboard/presents"}
        />
        <SidebarItem
          href="/dashboard/lists"
          label="Listas"
          icon={ListIcon}
          isActive={pathname === "/dashboard/lists"}
        />
      </ul>
    </div>
  );
};
