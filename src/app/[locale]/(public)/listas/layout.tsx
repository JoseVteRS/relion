import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/sections/footer";

export default function ListasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar />
      <div className="max-w-screen-lg mx-auto">{children}</div>
      <Footer />
    </section>
  );
}
