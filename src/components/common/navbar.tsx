import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";
import config from "../../../config/config";
import LogoLight from "./logo/logo-light";

export const Navbar = async () => {
  const session = await auth();
  const locale = await getLocale();
  const { raw } = await getTranslations("Navbar");
  return (
    <nav className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-lg text-neutral-100 ">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 ">
        <div className="w-full text-white flex items-center justify-start gap-5">
          <h1 className="font-bold text-lg">
            <Link href="/">
              <LogoLight />
            </Link>
            <span className="sr-only">{config.appName}</span>
          </h1>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem asChild>
                <Button asChild className="bg-red-600 hover:bg-red-700" size="sm">
                  <Link href="/es/listas/navidad" title="Navidad">
                    Naviad
                  </Link>
                </Button>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Listas</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-[200px] md:w-[200px] lg:w-[300px]">
                    <ListItem href="/es/listas/navidad" title="Navidad">
                      Crear lista de Navidad
                    </ListItem>
                    <ListItem href="/es/listas/cumpleanos" title="Cumpleaños">
                      Crear lista de Cumpleaños
                    </ListItem>
                    <ListItem href="/es/listas/boda" title="Boda">
                      Crear lista de Boda
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {!session && (
          <ul className="flex items-center gap-2">
            <li className="hidden md:inline-block">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="bg-transparent hover:dark:bg-white/10 hover:dark:text-white"
              >
                <Link href={`/${locale}/sign-in`}>{raw("login")}</Link>
              </Button>
            </li>

            <li>
              <Button asChild size="sm">
                <Link href={`/${locale}/sign-up`}>{raw("signUp")}</Link>
              </Button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
