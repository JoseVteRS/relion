"use client";

import { Button } from "@/components/ui/button";
import { TitlePage } from "@/components/common/page-title";
import { Plus, Calendar, GiftIcon, EyeIcon, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { format, isPast } from "date-fns";
import { es } from "date-fns/locale";
import { useMemo } from "react";
import { useGetFavorites } from "@/features/favorites/api/use-get-favorites";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function FollowedListsClientPage() {
  const session = useSession();
  const { data, isLoading } = useGetFavorites(session.data?.user?.id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="">
      <header className="flex items-center justify-between mb-10">
        <TitlePage>Listas favoritas</TitlePage>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.map((list) => (
          <Card
            key={list.id}
            className="w-full bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden"
          >
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-2">
                {list.list.user.name}
              </p>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold">{list.list.name}</h3>
                {/* {list.list. && (
                  <span className="text-xs font-medium text-destructive flex items-center">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Expirado
                  </span>
                )} */}
              </div>

              <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {format(list.list.eventDate, "PPP", { locale: es })}
                </span>
              </div>

              <div className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                <GiftIcon className="w-4 h-4" />
                {/* <span>
                  {list.totalPresents} regalos, {list.availablePresents}{" "}
                  disponibles
                </span> */}
              </div>

              <div className="flex items-center justify-between mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="text-primary hover:text-primary/80"
                >
                  <Link href={`/list/${list.list.id}`} prefetch className="flex items-center mr-0.5">
                    <EyeIcon className="w-4 h-4 mr-2" />
                    Ver lista
                  </Link>
                </Button>
                <Button variant="secondary" size="sm">
                  Dejar de seguir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* {listsWithExpirationStatus?.length === 0 && (
        <div className="text-center py-10">
          <p className="text-xl font-semibold mb-4">
            No estás siguiendo ninguna lista aún
          </p>
          <Button variant="default">
            <Plus className="mr-2 h-4 w-4" />
            Buscar listas para seguir
          </Button>
        </div>
      )} */}
    </div>
  );
}
