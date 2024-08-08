import { NavbarDashboard } from "@/app/dashboard/_components/navbar-dashboard";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="relative min-h-screen">
        <div className="container mx-auto py-5">{children}</div>
        <div className="sticky bottom-0 w-full ">
          <NavbarDashboard />
        </div>
      </div>
    </div>
  );
}
