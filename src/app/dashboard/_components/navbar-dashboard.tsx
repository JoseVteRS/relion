"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/features/auth/components/user-button";
import { cn } from "@/lib/utils";
import { GiftIcon, HomeIcon, ListIcon, SettingsIcon } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Escritorio", href: "/dashboard", icon: <HomeIcon /> },
  { label: "Regalos", href: "/dashboard/presents", icon: <GiftIcon /> },
  { label: "Listas", href: "/dashboard/lists", icon: <ListIcon /> },
  // { label: "Settings", href: "/dashboard/settings", icon: <SettingsIcon /> },
];

export const NavbarDashboard = () => {
  const pathname = usePathname();
  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <nav className="bg-neutral-950 py-2">
      <div className="container mx-auto flex items-center justify-between gap-4">
        {links.map((link) => (
          <div key={link.href} className="flex flex-col items-center gap-1">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className={cn(
                "hover:bg-primary/20 text-white ",
                isActive(link.href) &&
                  "bg-primary/10 text-neutral-100 hover:text-neutral-100"
              )}
            >
              <Link href={link.href} className="flex flex-col">
                {link.icon}
              </Link>
            </Button>
            <div className="text-xs font-bold">{link.label}</div>
          </div>
        ))}
        <UserButton />
      </div>
    </nav>
  );
};
