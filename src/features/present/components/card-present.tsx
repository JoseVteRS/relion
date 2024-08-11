import {
  EllipsisVerticalIcon,
  EyeIcon,
  ListIcon,
  PencilIcon,
  Trash,
  Trash2,
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
import { useDeletePresent } from "../api/use-delete-present";
import { useConfirm } from "../../../../hooks/use-confirm";
import { useOpenPresentSheetState } from "../hooks/use-open-present";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CardPresentProps {
  present: any;
  onEdit: () => void;
  onDelete?: () => void;
}

export const CardPresent = ({ present, onEdit }: CardPresentProps) => {
  const deletePresent = useDeletePresent(present.id);
  const [ConfirmDialog, confirm] = useConfirm(
    "Estás seguro que quieres borrar este regalo?",
    "Se borrará permanentemente este regalo"
  );

  const { onOpen } = useOpenPresentSheetState();

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      console.log("borrar regalo");
      deletePresent.mutate(undefined);
    }
  };

  return (
    <>
      <ConfirmDialog />
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-start">
            <div className="flex flex-col flex-1 items-start gap-1">
              <CardTitle className=" text-md">{present.name}</CardTitle>
              <StatusBadge status={present.status} />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVerticalIcon className="w-4 h-4 text-neutral-400 hover:text-neutral-500" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[150px] space-y-3">
                <DropdownMenuItem onClick={() => onOpen(present.id)} className="text-md">
                  <PencilIcon className="w-4 h-4 mr-2" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-md">
                  <Link href={`/dashboard/presents/${present.id}`} >
                    <EyeIcon className="w-4 h-4 mr-2" />
                    Ver
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="bg-red-600 text-md" onClick={onDelete}>
                  <TrashIcon className="w-4 h-4 mr-2" />
                  Borrar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex items-center gap-2">
              <ListIcon className="size-4" />
              <span className="text-xs">
                {present.list ? (
                  present.list
                ) : (
                  <span className="text-red-400">Sin lista</span>
                )}
              </span>
            </div>
            <div className="mt-1 text-neutral-100 ">
              <p className="text-xs truncate">{present.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
