import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCreatePick } from "@/features/pick/api/use-create-pick";
import { useDeletePick } from "@/features/pick/api/use-delete-pick";
import { cn } from "@/lib/utils";
import {
  Box,
  CheckIcon,
  ExternalLink,
  Gift,
  ListIcon,
  PackageCheck,
  PackageOpen,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface CardPublicPresentProps {
  present: any;
  listId?: string;
  authUserId?: string;
}

export const CardPublicPresent = ({
  present,
  listId,
  authUserId,
}: CardPublicPresentProps) => {
  const pick = useCreatePick(present.id, listId);
  const unpick = useDeletePick(present.id, listId);

  const onPick = () => {
    pick.mutate(undefined);
  };

  const onUnPick = () => {
    unpick.mutate(undefined);
  };

  const isPickedOwner = present.pickedBy === authUserId;

  console.log({ pickedBy: present.pickedBy, authUserId });

  return (
    <Card
      className={cn(
        "w-full",
        present.isPicked && "opacity-60",
        present.pickedBy === authUserId && "border-dashed border-green-500/50"
      )}
    >
      <CardHeader className="px-6 py-6 pb-2 sm:px-6 sm:py-6">
        <div className="flex items-start">
          <div>
            <CardTitle className="text-xl font-bold">{present.name}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <div className=" text-neutral-300 ">
            <p className="text-sm leading-7">{present.description}</p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        {present.link && (
          <div className="w-full flex flex-row items-center justify-start  gap-2">
            <Button
              className="text-xs underline md:no-underline"
              size="sm"
              variant="link"
              asChild
            >
              <Link
                href={`${present.link}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                Ver información
                <ExternalLink className="size-4" />
              </Link>
            </Button>
          </div>
        )}
        <div className="w-full">
          {present.isPicked ? (
            <Button
              variant="secondary"
              className="flex items-center gap-2 w-full bg-red-500/20"
              onClick={onUnPick}
              disabled={!isPickedOwner}
            >
              <PackageCheck className="text-red-500" />
              {/* TODO: Cambiar texto si el regalo esta pillado por el usuario logueado */}
              <span className="text-xs">Pillado</span>
            </Button>
          ) : (
            <Button
              variant="secondary"
              className="flex items-center gap-2 w-full"
              onClick={onPick}
            >
              <PackageOpen className="text-green-500" />
              <span className="text-xs">¡Me lo pido!</span>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
