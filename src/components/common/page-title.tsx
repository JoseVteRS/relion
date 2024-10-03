"use client";

interface TitlePageProps {
  children: React.ReactNode;
}

export const TitlePage = ({ children }: TitlePageProps) => {
  return <h2 className="text-primary font-bold text-4xl">{children}</h2>;
};
