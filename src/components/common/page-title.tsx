"use client";

interface TitlePageProps {
  children: React.ReactNode;
}

export const TitlePage = ({ children }: TitlePageProps) => {
  return <h2 className="text-emerald-500 font-bold text-2xl">{children}</h2>;
};
