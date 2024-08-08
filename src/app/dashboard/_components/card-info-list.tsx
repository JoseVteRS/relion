"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetUserLists } from "@/features/list/api/use-get-user-lists";

export const CardInfoList = () => {
  const { data: lists, isLoading } = useGetUserLists();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Listas</CardTitle>
        <CardDescription>Que has creado hasta el momento</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <>
            <p>Total de listas creadas: {lists?.length || 0}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
};
