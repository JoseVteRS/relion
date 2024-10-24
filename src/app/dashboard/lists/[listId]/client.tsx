"use client";
import { StatusBadge } from "@/components/common/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetPrivateList } from "@/features/list/api/use-get-private.list";
import {
    CardPresent,
    PresentWithList,
} from "@/features/present/components/card-present";
import { useCreatePresentModal } from "@/features/present/hooks/use-create-present-modal";
import { PlusCircle } from "lucide-react";

const convertDatesToDate = (present: any): PresentWithList => ({
  ...present,
  createdAt: present.createdAt ? new Date(present.createdAt) : null,
  updatedAt: present.updatedAt ? new Date(present.updatedAt) : null,
});

export const DashboardListDetailsPageClient = ({ id }: { id: string }) => {
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
    <Card className="bg-white dark:bg-background">
      <CardHeader>
        <CardTitle>{list?.name}</CardTitle>
        <StatusBadge status={list.status || false} />
        <div className="flex flex-col items-start gap-1 pt-5">
          <span className="text-sm text-muted-foreground">Fecha evento</span>
          <time dateTime={list.eventDate} className="text-sm font-medium">
            {new Date(list.eventDate).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </time>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-6 mt-10">
          <h2 className="text-xl font-bold">Regalos</h2>
          <Button variant="default" size="sm" onClick={open}>
            <PlusCircle className="w-4 h-4 mr-2" />
            Añadir Regalo
          </Button>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-4">
          {list?.presents.map((present, index) => (
            <CardPresent
              key={present.id}
              present={convertDatesToDate(present)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
