import { useMemo } from "react";
import {
  Calendar,
  EllipsisVerticalIcon,
  EyeIcon,
  GiftIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusBadge } from "@/components/common/status-badge";
import { useConfirm } from "../../../../hooks/use-confirm";
import { useOpenListSheetState } from "../hooks/use-open-list";
import { CopyToClipboard } from "@/components/common/copy-to-clipboard";
import { ShareWhatsappButton } from "@/components/common/share-whatsapp-button";
import { useDeleteList } from "../api/use-delete-list";
import { ListWithUserWithPresents } from "@/types/types";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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
      <Card 
        className="w-full shadow-lg rounded-lg overflow-hidden cursor-pointer transition-shadow hover:shadow-xl"
        onClick={goToListDetail}
      >
        <CardHeader className="">
          <div className="flex justify-between items-center">
            <StatusBadge status={list.status || false} />
            <div className="flex items-center justify-center gap-2 w-full">
              <CardTitle className="text-2xl leading-tight text-white">
                {list.name}
              </CardTitle>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger onClick={(e) => e.stopPropagation()}>
                <EllipsisVerticalIcon className="w-6 h-6 text-neutral-400 hover:text-neutral-500" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-neutral-800 text-white">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpen(list.id);
                  }}
                  className="flex items-center gap-2 hover:bg-neutral-600 text-md"
                >
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-2 bg-red-600/50 hover:bg-red-600/40 text-md"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete();
                  }}
                >
                  Borrar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="p-4">
            <div className="text-neutral-100 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span className="text-white text-xs">
                {format(new Date(list.eventDate), "PPP", { locale: es })}
              </span>
            </div>
            <div className="mt-1 text-neutral-100 flex items-center gap-2">
              <GiftIcon className="w-5 h-5" />
              <p className="text-md font-semibold">
                {list?.presents?.length === 0 ? (
                  <span className="text-sm font-normal">Sin regalos</span>
                ) : (
                  <div className="flex items-center gap-1">
                    {list?.presents?.length}{" "}
                    <span className="text-xs font-normal">
                      {list?.presents?.length === 1 ? "regalo" : "regalos"}
                    </span>
                  </div>
                )}
              </p>
            </div>
          </div>

          <div className="p-4 flex gap-2 items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="text-neutral-300 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                goToListDetail();
              }}
            >
              <EyeIcon className="w-4 h-4 mr-2" />
              Ver detalles
            </Button>
            <div className="flex gap-2">
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