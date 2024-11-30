import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/sections/footer";

interface PublicLayoutProps {
  children: React.ReactNode;
}


export const dynamic = 'force-static';
export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <main>{children}</main>
    </div>
  );
}
