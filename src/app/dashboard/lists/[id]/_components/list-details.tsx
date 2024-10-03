"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EyeIcon, PenIcon, PlusCircle, TrashIcon } from "lucide-react";
import { useGetPrivateList } from "@/features/list/api/use-get-private.list";
import { useNewPresentSheetState } from "@/features/present/hooks/use-new-present";
import { StatusBadge } from "@/components/common/status-badge";
import { TitlePage } from "@/components/common/page-title";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const DashboardListDetails = ({ id }: { id: string }) => {
  const { data: list, isLoading, isError } = useGetPrivateList(id);
  const { onOpen } = useNewPresentSheetState();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!list) return <div>List not found</div>;

  return (
    <div>
      <div>
        <div className="flex justify-start items-center gap-2">
          <TitlePage>{list?.name}</TitlePage>
          <StatusBadge status={list.status || false} />
        </div>
        <time dateTime={list.eventDate}>
          {new Date(list.eventDate).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </time>
      </div>

      <div className="flex justify-between items-center mb-6 mt-10">
        <h2 className="text-xl font-bold">Regalos</h2>
        <Button variant="default" size="sm" onClick={onOpen}>
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
                >
                  <PenIcon className="w-4 h-4" />
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
    </div>
  );
};
