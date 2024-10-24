import { NextBreadcrumbs } from "@/components/common/breadcumbs";
import { CreatePresentModal } from "@/features/present/components/create-present-modal";
import { Mobilebar } from "./_components/mobilebar";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark:bg-neutral-950 bg-white h-full">
      <CreatePresentModal />
      <Sidebar />
      <div className="lg:pl-[300px] flex flex-col h-full">
        <Navbar />
        <main className="bg-background flex-1 overflow-auto p-8 rounded-tl-xl">
          <div className="mb-5">
            <NextBreadcrumbs />
          </div>
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
