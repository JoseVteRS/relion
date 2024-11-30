import { CopyToClipboard } from "@/components/common/copy-to-clipboard";
import { ShareWhatsappButton } from "@/components/common/share-whatsapp-button";
import { StatusBadge } from "@/components/common/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListWithUserWithPresents } from "@/types/types";
import { format } from "date-fns";
import { enGB, es } from "date-fns/locale";
import {
  Calendar,
  EllipsisVerticalIcon,
  EyeIcon,
  GiftIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useConfirm } from "../../../../hooks/use-confirm";
import { useDeleteList } from "../api/use-delete-list";

interface CardListProps {
  list: ListWithUserWithPresents;
}

export const CardList = ({ list }: CardListProps) => {
  const locale = useLocale();
  const t = useTranslations("Dashboard.Lists");
  const shareLink = useMemo(
    () => `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/dashboard/lists/${list.id}/public`,
    [list.id, locale]
  );

  const [DialogConfirm, confirm] = useConfirm(
    "¿Estás seguro que quieres borrar esta lista?",
    "Se borrará permanentemente esta lista"
  );

  const deleteList = useDeleteList(list.id);

  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteList.mutate(undefined);
    }
  };

  return (
    <>
      <DialogConfirm />
      <Card className="bg-neutral-100 shadow-none border-neutral-300 dark:border-neutral-800 dark:bg-background relative overflow-hidden">

        <CardContent className="p-4 relative">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold">{list.name}</h3>
              <StatusBadge status={list.status || false} />
            </div>
            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="focus:outline-none"
                  onClick={(e) => e.stopPropagation()}
                >
                  <EllipsisVerticalIcon className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-popover text-popover-foreground">
                  <DropdownMenuItem
                    asChild
                    className="flex items-center space-x-2 hover:bg-accent hover:text-accent-foreground"
                  >
                    <Link href={`/${locale}/dashboard/lists/${list.id}`}>
                      <PencilIcon className="w-4 h-4" />
                      <span>{t("edit")}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center space-x-2 text-destructive hover:bg-destructive/50 hover:text-destructive-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete();
                    }}
                  >
                    <TrashIcon className="w-4 h-4" />
                    <span className="font-bold">{t("delete")}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>
              {new Intl.DateTimeFormat(locale, {
                day: "numeric",
                month: "long",
                year: "numeric",
              }).format(new Date(list.eventDate))}
            </span>
          </div>

          <div className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
            <GiftIcon className="w-4 h-4" />
            <span>{t("presentsCount", { count: list?.presents?.length })}</span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <Button
              variant="outline"
              size="sm"
              className="text-primary hover:text-primary/80"
              asChild
            >
              <Link href={`/${locale}/dashboard/lists/${list.id}`}>
                <EyeIcon className="w-4 h-4 mr-2" />
                {t("viewDetails")}
              </Link>
            </Button>
            <div className="flex w-full justify-end gap-2">
              <CopyToClipboard text={shareLink} />
              <ShareWhatsappButton
                url={shareLink}
                message={t("whatsappLinkShare", {
                  listName: list.name,
                  userName: list.user.name,
                })}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
