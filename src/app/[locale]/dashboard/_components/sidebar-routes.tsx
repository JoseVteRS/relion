"use client";

import { SidebarLists } from "@/components/common/sidebar-lists";
import { GiftIcon, HeartIcon, HomeIcon, ListIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { SidebarItem } from "./sidebar-item";

export const SidebarRoutes = () => {
  const pathname = usePathname();
  const locale = useLocale();
  const dashboardSidebar = useTranslations("Dashboard.Sidebar");
  return (
    <div className="flex flex-col gap-y-4 flex-1 pt-3">
      <ul className="flex flex-col gap-y-1 px-3">
        <SidebarItem
          href={`/${locale}/dashboard`}
          label={dashboardSidebar("Items.homeItem")}
          icon={HomeIcon}
          isActive={pathname === `/${locale}/dashboard`}
        />
        <SidebarItem
          href={`/${locale}/dashboard/presents`}
          label={dashboardSidebar("Items.presentsItem")}
          icon={GiftIcon}
          isActive={pathname === `/${locale}/dashboard/presents`}
        />
        <SidebarItem
          href={`/${locale}/dashboard/lists`}
          label={dashboardSidebar("Items.listsItem")}
          icon={ListIcon}
          isActive={pathname === `/${locale}/dashboard/lists`}
        />
        <SidebarItem
          href={`/${locale}/dashboard/favorite-lists`}
          label={dashboardSidebar("Items.favoritesItem")}
          icon={HeartIcon}
          isActive={pathname === `/${locale}/dashboard/favorite-lists`}
        />
      </ul>
      {/* <Separator /> */}
      <SidebarLists />
    </div>
  );
};
