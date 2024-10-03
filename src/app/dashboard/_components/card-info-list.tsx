"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetUserLists } from "@/features/list/api/use-get-user-lists";
import { GiftIcon, ListIcon, Loader2 } from "lucide-react";

export const CardInfoList = () => {
  const { data: lists, isLoading } = useGetUserLists();

  return (
    <Card className="flex items-center gap-2 p-10">
      <div className="flex items-center justify-center border rounded-lg border-primary p-2 h-24 w-24 bg-background">
        <ListIcon className="size-10" />
      </div>
      <div>
        <CardHeader>
          <CardTitle>Listas</CardTitle>
          <CardDescription>Listas creadas</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Loader2 className="animate-spin text-muted-foreground" />
          ) : (
            <span className="font-bold text-5xl">{lists?.length || 0}</span>
          )}
        </CardContent>
      </div>
    </Card>
  );
};
