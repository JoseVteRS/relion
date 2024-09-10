import { useMemo } from "react";
import {
  Calendar,
  EllipsisVerticalIcon,
  EyeIcon,
  GiftIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
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
import { ListWithUserWithPresents } from "@/types/list-types";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useNewPresentSheetState } from "@/features/present/hooks/use-new-present";
import { useGetCountLists } from "../api/use-get-count-lists";

interface CardListProps {
  list: ListWithUserWithPresents;
  onDelete: () => void;
  onEdit: () => void;
}

export const CardList = ({ list, onEdit }: CardListProps) => {
  const { onOpen: onOpenPresentSheet } = useNewPresentSheetState();

  const shareLink = useMemo(
    () => `${process.env.NEXT_PUBLIC_APP_URL}/list/${list.id}`,
    [list.id]
  );

  const [DialogConfirm, confirm] = useConfirm(
    "Estás seguro que quieres borrar esta lista?",
    "Se borrará permanentemente esta lista"
  );

  const deleteList = useDeleteList(list.id);
  const { onOpen } = useOpenListSheetState();
  const count = useGetCountLists()

  console.log(count)

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteList.mutate(undefined);
    }
  };

  return (
    <>
      <DialogConfirm />
      <Card className="w-full shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="p-4 border-b border-neutral-800">
          <div className="flex items-start justify-between">
            <div className="flex items-center justify-center gap-2 w-full">
              <StatusBadge status={list.status || false} />
              <CardTitle className="text-2xl leading-tight text-white">
                {list.name}
              </CardTitle>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVerticalIcon className="w-6 h-6 text-neutral-400 hover:text-neutral-500" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-neutral-800 text-white">
                <DropdownMenuItem
                  onClick={() => onOpen(list.id)}
                  className="flex items-center gap-2 hover:bg-neutral-600"
                >
                  <PencilIcon className="w-4 h-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 hover:bg-neutral-600">
                  <EyeIcon className="w-4 h-4" />
                  Ver
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-500"
                  onClick={onDelete}
                >
                  <TrashIcon className="w-4 h-4" />
                  Borrar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="p-4">
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
            <div className="text-neutral-100 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span className="text-white text-xs">
                {format(new Date(list.eventDate), "PPP", { locale: es })}
              </span>
            </div>
          </div>

          <div className="p-4 flex gap-2 items-center justify-end border-t border-neutral-800">
            <CopyToClipboard text={shareLink} />
            <ShareWhatsappButton
              url={shareLink}
              message={`¡Échale un vistazo a la lista ${list.name}! de ${list.user.name}`}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
};
