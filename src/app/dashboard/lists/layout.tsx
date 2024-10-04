import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Listas",
  }

export default function ListasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
