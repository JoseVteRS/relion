import React from "react";

import { SidebarRoutes } from "./sidebar-routes";
import Logo from "@/components/common/logo/logo";
import Link from "next/link";

export const Sidebar = () => {
  return (
    <aside className="hidden lg:flex fixed flex-col w-[300px] left-0 shrink-0 h-full">
      <Link href="/">
        <Logo />
      </Link>
      <SidebarRoutes />
    </aside>
  );
};
