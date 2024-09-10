import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/sections/footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" min-h-screen">
      <header className="bg-card">
        <Navbar />
      </header>
      {children}

      <Footer />
    </div>
  );
}
