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
import { es } from "date-fns/locale";
import {
  Calendar,
  EllipsisVerticalIcon,
  EyeIcon,
  GiftIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useConfirm } from "../../../../hooks/use-confirm";
import { useDeleteList } from "../api/use-delete-list";
import { useOpenListSheetState } from "../hooks/use-open-list";

interface CardListProps {
  list: ListWithUserWithPresents;
  onDelete: () => void;
  onEdit: () => void;
}

export const CardList = ({ list }: CardListProps) => {
  const router = useRouter();
  const shareLink = useMemo(
    () => `${process.env.NEXT_PUBLIC_APP_URL}/list/${list.id}`,
    [list.id]
  );

  const [DialogConfirm, confirm] = useConfirm(
    "¿Estás seguro que quieres borrar esta lista?",
    "Se borrará permanentemente esta lista"
  );

  const deleteList = useDeleteList(list.id);
  const { onOpen } = useOpenListSheetState();

  const onDelete = async () => {
    const ok = await confirm();
    if (ok) {
      deleteList.mutate(undefined);
    }
  };

  const goToListDetail = () => {
    router.push(`/dashboard/lists/${list.id}`);
  };

  return (
    <>
      <DialogConfirm />
      <Card className="cursor-pointer hover:border-primary transition-colors">
        <CardContent className="p-4">
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
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpen(list.id);
                    }}
                    className="flex items-center space-x-2 hover:bg-accent hover:text-accent-foreground"
                  >
                    <PencilIcon className="w-4 h-4" />
                    <span>Editar</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center space-x-2 text-destructive hover:bg-destructive/50 hover:text-destructive-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete();
                    }}
                  >
                    <TrashIcon className="w-4 h-4" />
                    <span className="font-bold">Borrar</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>
              {format(new Date(list.eventDate), "PPP", { locale: es })}
            </span>
          </div>

          <div className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
            <GiftIcon className="w-4 h-4" />
            <span>
              {list?.presents?.length === 0
                ? "Sin regalos"
                : `${list?.presents?.length} ${
                    list?.presents?.length === 1 ? "regalo" : "regalos"
                  }`}
            </span>
          </div>

          <div className="flex items-center justify-between mt-4">
            <Button
              variant="outline"
              size="sm"
              className="text-primary hover:text-primary/80"
              onClick={(e) => {
                e.stopPropagation();
                goToListDetail();
              }}
            >
              <EyeIcon className="w-4 h-4 mr-2" />
              Ver detalles
            </Button>
            <div className="flex w-full justify-end gap-2">
              <CopyToClipboard text={shareLink} />
              <ShareWhatsappButton
                url={shareLink}
                message={`¡Échale un vistazo a la lista ${list.name}! de ${list.user.name}`}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
