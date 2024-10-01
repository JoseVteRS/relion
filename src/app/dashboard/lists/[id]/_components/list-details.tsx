"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LockIcon, LockKeyhole, PlusCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { useGetPrivateList } from "@/features/list/api/use-get-private.list";
import { useNewPresentSheetState } from "@/features/present/hooks/use-new-present";
import { StatusBadge } from "@/components/common/status-badge";

const regalos = [
  {
    nombre: "Libro de cocina",
    descripcion: "Preferiblemente de cocina italiana",
  },
  {
    nombre: "Set de cuchillos",
    descripcion: "Un set profesional de 5 piezas",
  },
  {
    nombre: "Cafetera",
    descripcion: "Una cafetera de espresso automática",
  },
  {
    nombre: "Altavoz Bluetooth",
    descripcion: "Resistente al agua para usar en exteriores",
  },
];

export const DashboardListDetails = ({ id }: { id: string }) => {
  const { data: list, isLoading, isError } = useGetPrivateList(id);
  const { onOpen } = useNewPresentSheetState();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{list?.name}</h1>
        <Button variant="ghost" size="sm" onClick={onOpen}>
          <PlusCircle className="w-4 h-4 mr-2" />
          Añadir Regalo
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Detalles del Evento</CardTitle>
        </CardHeader>
        {list && (
          <CardContent>
            <p>
              <strong>Fecha:&nbsp;</strong>
              <time dateTime={list.eventDate}>
                {new Date(list.eventDate).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </p>
          </CardContent>
        )}
      </Card>

      <div className="flex justify-between items-center mb-6 mt-10">
        <h2 className="text-xl font-bold">Regalos</h2>
      </div>
      <ul className="space-y-4 mt-5">
        {list?.presents.map((present, index) => (
          <li
            key={present.id || index}
            className="border-b border-muted-foreground/20 pb-4 last:border-b-0"
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="font-medium text-lg">{present.name}</h3>
                <p className="text-muted-foreground text-sm w-[200px] truncate">
                  {present.description}
                </p>
              </div>

              <StatusBadge status={present.status as boolean} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
