import NextBreadcrumb from "@/components/common/breadcumbs";
import { Mobilebar } from "./_components/mobilebar";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { ChevronRightIcon } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark:bg-neutral-950 bg-white h-full">
      <Sidebar />
      <div className="lg:pl-[300px] flex flex-col h-full">
        <Navbar />
        <main className="bg-background flex-1 overflow-auto p-8 rounded-tl-xl">
          <NextBreadcrumb
            homeElement={"Inicio"}
            separator={<ChevronRightIcon className="size-4" />}
            activeClasses="text-primary"
            containerClasses="flex items-center text-muted-foreground mb-10"
            listClasses="hover:underline mx-2  text-sm  font-medium flex items-center"
            capitalizeLinks
          />
          {children}
        </main>
        <div className="lg:hidden relative">
          <div className="sticky bottom-0 left-0 right-0 z-10 bg-background border-b">
            <Mobilebar />
          </div>
        </div>
      </div>
    </div>
  );
}
