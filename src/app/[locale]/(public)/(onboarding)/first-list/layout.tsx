import { Navbar } from "@/components/common/navbar";

export default function OnboardingLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <div>
        <Navbar />
      {children}
    </div>
  );
}