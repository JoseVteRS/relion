"use client";

import { LocaleSwitcher } from "@/components/common/locale-switcher";
import LogoDark from "@/components/common/logo/logo-dark";
import LogoLight from "@/components/common/logo/logo-light";
import { ModeToggle } from "@/components/common/mode-toggle";
import { Badge } from "@/components/ui/badge";
import { UserButton } from "@/features/auth/components/user-button";
import { useTheme } from "next-themes";
import Link from "next/link";

export const Navbar = () => {
  const { theme } = useTheme();
  return (
    <nav className="w-full flex items-center p-4 h-[68px] border-b border-border">
      <div className="flex items-center">
        <Link href="/" className="flex items-center gap-2">
          {theme === "light" ? <LogoDark /> : <LogoLight />}
          <span className="sr-only">Inicio</span>
        </Link>
        <Badge variant="outline">beta</Badge>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <LocaleSwitcher />
        <ModeToggle />
        <UserButton />
      </div>
    </nav>
  );
};
