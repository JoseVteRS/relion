import { NextBreadcrumbs } from "@/components/common/breadcumbs";
import { CreateListModal } from "@/features/list/components/create-list-modal";
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
    <div className="dark:bg-neutral-950 bg-white min-h-screen">
      <CreatePresentModal />
      <CreateListModal />
      <Navbar />
      <div className="flex w-full h-full">
        <div className="sticky left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
          <Sidebar />
        </div>
        <div className="w-full">
          <div className="mx-auto max-w-screen-2xl h-full">
            <main className="h-full py-8 px-6 flex flex-col">
              <div className="mb-4">
                <NextBreadcrumbs />
              </div>
              {children}
            </main>
          </div>
        </div>
        <div className="lg:hidden relative">
          <div className="sticky bottom-0 left-0 right-0 z-10 bg-background border-b">
            <Mobilebar />
          </div>
        </div>
      </div>
    </div>
  );
}
