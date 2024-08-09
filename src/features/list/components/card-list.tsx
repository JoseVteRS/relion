import {
  EllipsisVerticalIcon,
  EyeIcon,
  GiftIcon,
  PencilIcon,
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

interface CardListProps {
  list: any;
  onDelete: () => void;
  onEdit: () => void;
}

export const CardList = ({ list, onEdit }: CardListProps) => {
  const shareLink = `${process.env.NEXT_PUBLIC_APP_URL}/list/${list.id}`;

  const [DialogConfirm, confirm] = useConfirm(
    "Estás seguro que quieres borrar esta lista?",
    "Se borrará permanentemente esta lista"
  );

  const deleteList = useDeleteList(list.id);
  const { onOpen } = useOpenListSheetState();

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      console.log("borrar regalo");
      deleteList.mutate(undefined);
    }
  };

  return (
    <>
      <DialogConfirm />
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-start">
            <div className="flex flex-col flex-1 items-start gap-1">
              <CardTitle className="text-lg leading-tight">
                {list.name}
              </CardTitle>
              <StatusBadge status={list.status} />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVerticalIcon className="size-4 text-neutral-400 hover:text-neutral-500" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onOpen(list.id)}>
                  <PencilIcon className="size-4 mr-2" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <EyeIcon className="size-4 mr-2" />
                  Ver
                </DropdownMenuItem>
                <DropdownMenuItem className="bg-red-600" onClick={onDelete}>
                  <TrashIcon className="size-4 mr-2" />
                  Borrar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <div className="mt-1 text-neutral-100 flex items-center gap-1">
              <GiftIcon className="size-4" />
              <p className="text-md font-semibold">
                {list.presents.length === 0 ? (
                  <span className="text-sm font-normal">Sin regalos</span>
                ) : (
                  list.presents.length
                )}
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-center justify-end">
            <CopyToClipboard text={shareLink} />
            <ShareWhatsappButton
              url={shareLink}
              message={`¡Échale un vistazo a la lista ${list.name} de ${list.user.name}!`}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
};
