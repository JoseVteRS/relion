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
    <div className="DashboardLayout dark:bg-neutral-950 bg-white min-h-screen">
      <CreatePresentModal />
      <CreateListModal />
      <Navbar />
      <div className="flex w-full h-full">
        <div className="sticky left-0 top-0 hidden lg:block lg:w-[300px] h-screen overflow-y-auto">
          <Sidebar />
        </div>

        <div className="max-w-screen-2xl w-full mx-auto">
          <main className="px-6 pt-5 pb-24 w-full">
            <div className="mb-5 flex items-center gap-2 justify-between">
              {/* <NextBreadcrumbs /> */}
            </div>
            {children}
          </main>
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
