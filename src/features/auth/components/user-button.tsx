"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";
import { CreditCard, Crown, Loader, LogOut, SettingsIcon } from "lucide-react";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export const UserButton = () => {
  const session = useSession();
  const { shouldBlock } = usePaywall();

  if (session.status === "loading") {
    return <Loader className="size-4 animate-spin text-muted-foreground" />;
  }

  if (session.status === "unauthenticated" || !session.data) {
    return null;
  }

  const name = session.data?.user?.name!;
  const imageUrl = session.data?.user?.image;

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        {!shouldBlock && (
          <div className="relative">
            <div className="absolute -top-1 -left-1 bg-black border-[1px] border-primary p-0.5 rounded-full z-10 opacity-75">
              <Crown className="size-3 text-primary fill-primary" />
            </div>
          </div>
        )}

        <Avatar className="size-10 hover:opacity-75 transition rounded-full">
          <AvatarImage alt={name} src={imageUrl || ""} />
          <AvatarFallback className="bg-primary font-medium text-neutral-900">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuItem disabled={false} onClick={() => {}} className="h-10">
          <CreditCard className="mr-2 size-4" />
          Facturación
        </DropdownMenuItem>
        <DropdownMenuItem disabled={false} onClick={() => {}} className="h-10">
          <SettingsIcon className="mr-2 size-4" />
          <Link href="/dashboard/settings">Ajustes</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={false}
          onClick={() =>
            signOut({
              callbackUrl: "/",
              redirect: true,
            })
          }
          className="h-10"
        >
          <LogOut className="mr-2 size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
