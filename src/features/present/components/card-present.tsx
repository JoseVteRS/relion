import { Card, CardContent } from "@/components/ui/card";
import {
  EllipsisVerticalIcon,
  LinkIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";

import { StatusBadge } from "@/components/common/status-badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { List, Present } from "@/types/types";
import Link from "next/link";
import { useConfirm } from "../../../../hooks/use-confirm";
import { useDeletePresent } from "../api/use-delete-present";

export type PresentWithList = Present & {
  list: List;
};

interface LinkDetails {
  fullLink: string;
  displayText: string;
}

function processLink(link: string | null): LinkDetails {
  if (!link) return { fullLink: "", displayText: "" };

  const fullLink = link.startsWith("https://") ? link : `https://${link}`;
  const displayText = link.startsWith("https://")
    ? new URL(link).hostname
    : link;
  return { fullLink, displayText };
}

interface CardPresentProps {
  present: PresentWithList;
}

export const CardPresent = ({ present }: CardPresentProps) => {
  const deletePresent = useDeletePresent(present.id);
  const [ConfirmDialog, confirm] = useConfirm(
    "Estás seguro que quieres borrar este regalo?",
    "Se borrará permanentemente este regalo"
  );

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deletePresent.mutate(undefined);
    }
  };

  const presentExternalLink = processLink(present?.link);

  return (
    <>
      <ConfirmDialog />
      <Card className="bg-neutral-100 shadow-none border-neutral-300 dark:border-neutral-700 dark:bg-background">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-semibold">{present.name}</h3>
                <StatusBadge status={present.status || false} />
              </div>

              {present.list && (
                <Link
                  href={`/dashboard/lists/${present.list.id}`}
                  className="text-sm text-primary hover:underline mb-2 inline-block"
                >
                  {present.list.name}
                </Link>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <EllipsisVerticalIcon className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-popover text-popover-foreground">
                  <DropdownMenuItem
                    asChild
                    className="flex items-center space-x-2 hover:bg-accent hover:text-accent-foreground"
                  >
                    <Link href={`/dashboard/presents/${present.id}`}>
                      <PencilIcon className="w-4 h-4" />
                      <span>Editar</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="flex items-center space-x-2 text-destructive hover:bg-destructive/50 hover:text-destructive-foreground"
                    onClick={onDelete}
                  >
                    <TrashIcon className="w-4 h-4" />
                    <span className="font-bold">Borrar</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
            {present.description}
          </p>

          {present.link && (
            <Link
              href={presentExternalLink.fullLink}
              target="_blank"
              rel="noreferrer noopener"
              className="flex underline mt-4 items-center text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <LinkIcon className="w-3 h-3 mr-1" />
              {presentExternalLink.displayText}
            </Link>
          )}
        </CardContent>
      </Card>
    </>
  );
};
