"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { useGetPrivateList } from "@/features/list/api/use-get-private.list";

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
        <h2 className="text-3xl font-bold">Regalos</h2>
      </div>

      <Card className="pt-6">
        <CardContent>
          <ul className="space-y-4">
            {list?.presents.map((present, index) => (
              <li key={index} className=" border-b pb-2">
                <div className="flex-grow mr-4">
                  <div className="font-medium">{present.name}</div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <p className="text-sm text-gray-500 truncate max-w-xs">
                          {present.description}
                        </p>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{present.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                {/* <div className="flex items-center space-x-2 flex-shrink-0">
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div> */}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
