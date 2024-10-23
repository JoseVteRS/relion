import Logo from "@/components/common/logo/logo";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
  return (
    <aside className="hidden lg:flex fixed flex-col w-[300px] left-0 shrink-0 h-full">
      <div className="flex items-center justify-start px-4">
        <Link href="/">
          <Logo />
        </Link>
        <Badge variant="secondary">beta</Badge>
      </div>

      <SidebarRoutes />
    </aside>
  );
};
