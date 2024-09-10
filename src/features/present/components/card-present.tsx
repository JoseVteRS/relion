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
      <Card className="w-full shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="p-4 border-b border-neutral-800">
          <div className="flex items-start justify-between">
            <div className="flex items-center justify-center gap-2 w-full">
              <StatusBadge status={present.status || false} />
              <CardTitle className="text-2xl leading-tight text-white">
                {present.name}
              </CardTitle>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVerticalIcon className="w-6 h-6 text-neutral-400 hover:text-neutral-500" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-neutral-800 text-white">
                <DropdownMenuItem
                  onClick={() => onOpen(present.id)}
                  className="flex items-center gap-2 hover:bg-neutral-600"
                >
                  <PencilIcon className="w-4 h-4" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem
                  asChild
                  className="flex items-center gap-2 hover:bg-neutral-600"
                >
                  <Link href={`/dashboard/presents/${present.id}`}>
                    <EyeIcon className="w-4 h-4" />
                    Ver
                  </Link>
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
        <CardContent className="p-4">
          <div>
            <div className="flex items-center gap-2 text-neutral-100">
              <ListIcon className="w-5 h-5" />
              <span className="text-md">
                {present.list ? (
                  present.list
                ) : (
                  <span className="text-red-400">Sin lista</span>
                )}
              </span>
            </div>
            <div className="mt-1 text-neutral-100">
              <p className="text-md truncate">{present.description}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
