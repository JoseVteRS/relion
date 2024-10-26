import { SidebarRoutes } from "./sidebar-routes";

export const Sidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col left-0 shrink-0 h-full border-r border-border bg-white dark:bg-black">
      <SidebarRoutes />
    </aside>
  );
};
