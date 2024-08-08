"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetUserPresents } from "@/features/present/api/use-get-user-presents";

export const CardInfoPresent = () => {
  const { data: presents, isLoading } = useGetUserPresents();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Regalos</CardTitle>
        <CardDescription>Que has creado hasta el momento</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <>
            <p>Total de regalos creados: {presents?.length || 0}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
};
