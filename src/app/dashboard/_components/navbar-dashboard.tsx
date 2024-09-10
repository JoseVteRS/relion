"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserButton } from "@/features/auth/components/user-button";
import { cn } from "@/lib/utils";
import { GiftIcon, HomeIcon, ListIcon, SettingsIcon } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Dashboard", href: "/dashboard", icon: <HomeIcon /> },
  { label: "Presents", href: "/dashboard/presents", icon: <GiftIcon /> },
  { label: "Lists", href: "/dashboard/lists", icon: <ListIcon /> },
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
          <Button
            asChild
            key={link.href}
            variant="ghost"
            size="icon"
            className={cn(
              "hover:bg-primary text-white bg-neutral-900",
              isActive(link.href) &&
                "bg-primary text-neutral-900 hover:text-neutral-900"
            )}
          >
            <Link href={link.href}>{link.icon}</Link>
          </Button>
        ))}
        <UserButton />
      </div>
    </nav>
  );
};
