"use client";

import { cn } from "@/lib/utils";
import { GiftIcon, HeartIcon, HomeIcon, ListIcon } from "lucide-react";
import { useLocale } from "next-intl";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const Mobilebar = () => {
  const pathname = usePathname();
  const isActive = (href: string) => {
    return pathname === href;
  };

  const locale = useLocale();

  const links = useMemo(
    () => [
      { label: "Escritorio", href: `/${locale}/dashboard`, icon: <HomeIcon /> },
      {
        label: "Regalos",
        href: `/${locale}/dashboard/presents`,
        icon: <GiftIcon />,
      },
      {
        label: "Listas",
        href: `/${locale}/dashboard/lists`,
        icon: <ListIcon />,
      },
      {
        label: "Favoritas",
        href: `/${locale}/dashboard/favorite-lists`,
        icon: <HeartIcon />,
      },
    ],
    []
  );

  return (
    <>
      <nav className="bg-background py-2 fixed bottom-0 left-0 right-0 border-t border-border">
        <div className="container mx-auto flex items-center justify-between">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex flex-col items-center"
            >
              <div
                className={cn(
                  "p-2 rounded-md transition-colors",
                  "hover:bg-gray-200 dark:hover:bg-primary/10",
                  "active:bg-gray-300 dark:active:bg-primary/20",
                  isActive(link.href) && "bg-gray-300 dark:bg-primary/20"
                )}
              >
                {link.icon}
              </div>
              <span className="text-xs font-medium mt-1 text-gray-600 dark:text-gray-400">
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};
