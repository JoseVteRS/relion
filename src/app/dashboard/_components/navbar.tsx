"use client";


import Link from "next/link";
import { useWindowSize } from "react-use";
import { UserButton } from "@/features/auth/components/user-button";
import Logo from "@/components/common/logo/logo";

export const Navbar = () => {
  const { width } = useWindowSize();

  return (
    <nav className="w-full flex items-center p-4 h-[68px]">
      <div className="lg:hidden">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
          <span className="sr-only">Inicio</span>
        </Link>
      </div>
      <div className="ml-auto">
        <UserButton />
      </div>
    </nav>
  );
};
