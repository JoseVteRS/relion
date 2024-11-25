"use client";

import { TitlePage } from "@/components/common/page-title";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { usePickedPresents } from "@/features/present/api/use-get-picked-presents";
import { useGetStats } from "@/features/stats/api/use-get-stats";
import { differenceInDays, format } from "date-fns";
import { enUS, es } from "date-fns/locale";
import {
  CalendarIcon,
  ExternalLinkIcon,
  EyeIcon,
  GiftIcon,
  ListTodoIcon,
  ShoppingBag,
} from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { list } from "postcss";

export default function DashboardPageClient() {
  const { data } = useGetStats();
  const { data: pickedPresents, isLoading } = usePickedPresents();

  const locale = useLocale();

  const { listsCount, presentsCount, pickedPresentsCount, nearEvents } =
    data?.data || {};

  return (
    <div className="container mx-auto space-y-8">
      <TitlePage>Escritorio</TitlePage>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="relative overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-3xl font-bold">{listsCount || 0}</p>
                <p className="text-sm text-muted-foreground">
                  Mis Listas Creadas
                </p>
              </div>

              <ListTodoIcon className="w-5 h-5 text-primary" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/10">
              <Link
                href="/lists"
                className="w-full h-full block hover:bg-primary/20 transition-colors"
              />
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-3xl font-bold">{presentsCount || 0}</p>
                <p className="text-sm text-muted-foreground">Regalos creados</p>
              </div>

              <GiftIcon className="w-5 h-5 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-3xl font-bold">{pickedPresentsCount || 0}</p>
                <p className="text-sm text-muted-foreground">
                  Regalos reservados
                </p>
              </div>

              <ShoppingBag className="w-5 h-5 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-3xl font-bold">{nearEvents?.length || 0}</p>
                <p className="text-sm text-muted-foreground">
                  Eventos Próximos
                </p>
              </div>

              <CalendarIcon className="w-5 h-5 text-primary" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Picked Presents Section */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <GiftIcon className="w-5 h-5 text-primary" />
            Mis Regalos Reservados
          </h3>
          <div className="space-y-4">
            {isLoading && <p>Cargando...</p>}
            {pickedPresents?.data.map((present) => (
              <div
                key={present.id}
                className="p-4 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium text-md md:text-lg">{present.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {present.listName} • Para: {present.listOwner}
                    </p>
                  </div>
                  {present.link && (
                    <Button variant="ghost" size="sm" asChild className="ml-4">
                      <Link
                        href={present.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLinkIcon className="w-4 h-4" />
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Events Section */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-primary" />
            Eventos Próximos
          </h3>
          <div className="space-y-4">
            {nearEvents?.map((event) => {
              const daysUntilEvent = differenceInDays(
                event.eventDate,
                new Date()
              );
              const getBadgeColor = () => {
                if (daysUntilEvent <= 14)
                  return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
                if (daysUntilEvent <= 21)
                  return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
                if (daysUntilEvent <= 28)
                  return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
                return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
              };

              return (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-accent/20 hover:bg-accent/30 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between w-full gap-2">
                      <Link
                        href={`/${locale}/dashboard/lists/${event.id}/public`}
                        className="text-md md:text-lg font-medium hover:text-primary transition-colors"
                      >
                        {event.name}
                      </Link>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {format(event.eventDate, "PPP", {
                        locale: locale === "es" ? es : enUS,
                      })}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Lista de <span className=" text-white">{event.listOwner}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`px-2 py-1 text-xs font-medium rounded-full ${getBadgeColor()}`}
                    >
                      {daysUntilEvent} días
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link
                        href={`/${locale}/dashboard/lists/${event.id}/public`}
                      >
                        <EyeIcon className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
