"use client";

import { TitlePage } from "@/components/common/page-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetFavorites } from "@/features/favorites/api/use-get-favorites";
import { format, isPast } from "date-fns";
import { enUS, es } from "date-fns/locale";
import { AlertCircle, Calendar, EyeIcon, GiftIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import LoadingPage from "../loading";

export default function FollowedListsClientPage() {
  const locale = useLocale();
  const t = useTranslations("Dashboard.FavoriteLists");

  const session = useSession();
  const { data: favoriteLists, isLoading } = useGetFavorites(
    session.data?.user?.id
  );

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="">
      <header className="flex items-center justify-between mb-10">
        <TitlePage>{t("title")}</TitlePage>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {favoriteLists?.map((list) => (
          <Card key={list.id} className="w-full bg-card text-card-foreground">
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground mb-2">
                {list.list.user.name}
              </p>
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold">{list.list.name}</h3>
                {list.list.eventDate && isPast(list.list.eventDate) && (
                  <span className="text-xs font-medium text-destructive flex items-start">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Expirado
                  </span>
                )}
              </div>

              <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {format(list.list.eventDate, "PPP", {
                    locale: locale === "es" ? es : enUS,
                  })}
                </span>
              </div>

              <div className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                <GiftIcon className="w-4 h-4" />
                <span>
                  {list.list.presents.length} regalos,{" "}
                  {
                    list.list.presents.filter(
                      (present) => present.isPicked === false
                    ).length
                  }{" "}
                  disponibles
                </span>
              </div>

              <div className="flex items-center justify-between mt-4">
                <Button variant="ghost" size="sm">
                  {t("buttons.unfollow")}
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  asChild
                >
                  <Link
                    href={`/${locale}/dashboard/lists/${list.list.id}/public`}
                    prefetch
                    className="flex items-center mr-0.5"
                  >
                    <EyeIcon className="w-4 h-4 mr-2" />
                    {t("buttons.viewDetails")}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
