"use client";

import { TitlePage } from "@/components/common/page-title";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGetStats } from "@/features/stats/api/use-get-stats";
import { format } from "date-fns";
import { enUS, es } from "date-fns/locale";
import {
    CalendarIcon,
    EyeIcon,
    GiftIcon,
    ListTodoIcon,
} from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";

export default function DashboardPageClient() {
  const { data } = useGetStats();

  const locale = useLocale();

  const { listsCount, presentsCount, pickedPresentsCount, nearEvents } =
    data?.data || {};

  return (
    <div>
      <TitlePage>Escritorio</TitlePage>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <ListTodoIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Mis Listas Creadas
              </p>
              <p className="text-2xl font-bold">{listsCount}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <ListTodoIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Mis Regalos Creados
              </p>
              <p className="text-2xl font-bold">{presentsCount}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <GiftIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Regalos Reservados
              </p>
              <p className="text-2xl font-bold">{pickedPresentsCount}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <CalendarIcon className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Eventos Próximos</p>
              <p className="text-2xl font-bold">{nearEvents?.length || 0}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Sección adicional para más detalles */}
      <div className="mt-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            Eventos en los proximos 60 días
          </h3>
          {nearEvents?.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between py-2 border-b last:border-0"
            >
              <div className="flex flex-col gap-1">
                <Link
                  href={`/${locale}/dashboard/lists/${event.id}/public`}
                  className="font-medium hover:text-primary transition-colors"
                >
                  {event.name}
                </Link>
                <span className="text-sm text-muted-foreground">
                  {format(event.eventDate, "PPP", {
                    locale: locale === "es" ? es : enUS,
                  })}
                </span>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href={`/${locale}/dashboard/lists/${event.id}/public`}>
                  <EyeIcon className="w-4 h-4 mr-2" />
                  Ver detalles
                </Link>
              </Button>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
