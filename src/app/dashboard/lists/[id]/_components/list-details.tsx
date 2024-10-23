"use client";
import { StatusBadge } from "@/components/common/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetPrivateList } from "@/features/list/api/use-get-private.list";
import { useCreatePresentModal } from "@/features/present/hooks/use-create-present-modal";
import { PenIcon, PlusCircle, TrashIcon } from "lucide-react";
import Link from "next/link";

export const DashboardListDetails = ({ id }: { id: string }) => {
  const { data: list, isLoading, isError } = useGetPrivateList(id);
  const { open } = useCreatePresentModal();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!list) return <div>List not found</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{list?.name}</CardTitle>
        <StatusBadge status={list.status || false} />
        <time dateTime={list.eventDate}>
          {new Date(list.eventDate).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6 mt-10">
          <h2 className="text-xl font-bold">Regalos</h2>
          <Button variant="default" size="sm" onClick={open}>
            <PlusCircle className="w-4 h-4 mr-2" />
            Añadir Regalo a la lista
          </Button>
        </div>

        <Table>
          <TableCaption>Listado de regalos</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px] truncate">Nombre</TableHead>
              <TableHead className="w-[100px]">Estado</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {list?.presents.map((present, index) => (
              <TableRow key={present.id}>
                <TableCell className="font-medium">{present.name}</TableCell>
                <TableCell>
                  <StatusBadge status={present.status || false} />
                </TableCell>
                <TableCell>{present.description}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary/80"
                    asChild
                  >
                    <Link href={`/dashboard/presents/${present.id}`}>
                      <PenIcon className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive/80"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
