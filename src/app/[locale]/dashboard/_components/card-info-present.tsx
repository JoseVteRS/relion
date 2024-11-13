"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetUserPresents } from "@/features/present/api/use-get-user-presents";
import { GiftIcon, Loader2Icon } from "lucide-react";

export const CardInfoPresent = () => {
  const { data: presents, isLoading } = useGetUserPresents();

  return (
    <Card className="flex items-center gap-2 p-10">
      <div className="flex items-center justify-center border rounded-lg border-primary p-2 h-24 w-24 bg-background">
        <GiftIcon className="size-10" />
      </div>
      <div>
        <CardHeader>
          <CardTitle>Regalos</CardTitle>
          <CardDescription>Regalos creadas</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Loader2Icon className="animate-spin text-muted-foreground" />
          ) : (
            <span className="font-bold text-5xl">{presents?.length || "Sin regalos"}</span>
          )}
        </CardContent>
      </div>
    </Card>
  );
};
