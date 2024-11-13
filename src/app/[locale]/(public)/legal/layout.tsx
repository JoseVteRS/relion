import type { ReactNode } from "react";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-black">
      <main className="px-4 py-8">
        <div className="max-w-4xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
