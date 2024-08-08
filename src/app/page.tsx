import { auth } from "@/auth";
import { Navbar } from "@/components/common/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <header>
        <Navbar />
      </header>
      <div className="container mx-auto max-w-[800px] pt-10">
        <h2 className="text-neutral-50 font-bold text-5xl">
          Que te <span className="text-emerald-500">regalen</span> lo que te{" "}
          <span className="text-emerald-500">gusta</span>
        </h2>
      </div>
      <div className="container mx-auto max-w-[800px] pt-10 pb-20">
        <Button variant="primary" className="" asChild>
          <Link href="/sign-up">Crear mi primera lista</Link>
        </Button>
      </div>
    </main>
  );
}
