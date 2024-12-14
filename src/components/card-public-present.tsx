import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/db/prisma";
import { useCreatePick } from "@/features/pick/api/use-create-pick";
import { useDeletePick } from "@/features/pick/api/use-delete-pick";
import { useGetPick } from "@/features/pick/api/use-get-pick";
import { useUpdatePick } from "@/features/pick/api/use-update-pick";
import { client } from "@/lib/hono";
import { cn } from "@/lib/utils";
import { PickStatus, Present } from "@prisma/client";
import {
  BoxIcon,
  Currency,
  EuroIcon,
  LinkIcon,
  PackageCheck,
  PackageOpen,
  ShoppingBagIcon,
  ShoppingCartIcon,
  UserIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FcMoneyTransfer } from "react-icons/fc";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Skeleton } from "./ui/skeleton";

interface CardPublicPresentProps {
  present: Present;
  listId?: string;
  authUserId?: string;
}

export const CardPublicPresent = ({
  present,
  listId,
  authUserId,
}: CardPublicPresentProps) => {
  const t = useTranslations("Dashboard.Presents.presentShared");

  const pick = useCreatePick(present.id, listId);
  const unpick = useDeletePick(present.id, listId);
  const updatePick = useUpdatePick();

  const isPickedOwner = present.pickedById === authUserId;

  const { data: pickData, isLoading } = useGetPick(present.id, listId!);

  useEffect(() => {
    if (pickData?.status) {
      setStatus(pickData.status);
    }
  }, [pickData?.status]);

  const [status, setStatus] = useState<PickStatus | undefined>(undefined);

  const onPick = () => {
    pick.mutate(undefined);
  };

  const onUnPick = () => {
    unpick.mutate(undefined);
  };

  const onStatusChange = async () => {
    const newStatus =
      status === PickStatus.PURCHASED
        ? PickStatus.RESERVED
        : PickStatus.PURCHASED;

    setStatus(newStatus);
    updatePick.mutate({
      param: { presentId: present.id },
      json: { status: newStatus },
    });
  };

  const currentStatus = status ?? pickData?.status ?? PickStatus.RESERVED;
  const isPurchased = currentStatus === PickStatus.PURCHASED;
  const isReserved = currentStatus === PickStatus.RESERVED;

  if (isLoading) {
    return <Skeleton className="w-full h-[200px]" />;
  }

  return (
    <Card
      className={cn(
        "border-2",
        isPickedOwner
          ? isPurchased
            ? "border-green-500/60"
            : "border-yellow-500/60 border-dashed"
          : "border-muted"
      )}
    >
      <CardHeader>
        <div className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <CardTitle>{present.name}</CardTitle>
            {isPurchased && <Badge variant="outline">Comprado</Badge>}
          </div>
        </div>

        <CardDescription>{present.description}</CardDescription>

        <Link
          href={present.link || "#"}
          target="_blank"
          className="w-fit text-primary"
        >
          {present.link}
        </Link>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          {pickData?.pickedBy?.name && (
            <Badge variant="outline">
              <UserIcon className="size-4 mr-1" />
              Pillado por {pickData.pickedById === authUserId && "ti"}
              {pickData.pickedById !== authUserId &&
                pickData?.pickedBy?.name.split(" ").slice(0, 2).join(" ")}
            </Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="w-full">
        <div className="flex flex-col items-start gap-2 w-full">
          <ButtonsPick
            listId={listId || ""}
            ownerListId={present.ownerId || ""}
            onPick={onPick}
            onUnPick={onUnPick}
            isPickedByMe={isPickedOwner}
            isPickedByOther={!!present.pickedById && !isPickedOwner}
          />
          {isPickedOwner && (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => onStatusChange()}
            >
              <ShoppingCartIcon className=" size-5 mr-1" />
              {isPurchased ? "Marcar como reservado" : "Marcar como comprado"}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

interface ButtonsPickProps {
  onPick: () => void;
  onUnPick: () => void;
  onPickForOther?: () => void;
  listId: string;
  ownerListId: string;
  isPickedByMe: boolean;
  isPickedByOther: boolean;
}

export function ButtonsPick({
  onPick,
  onUnPick,
  onPickForOther,
  listId,
  ownerListId,
  isPickedByMe,
  isPickedByOther,
}: ButtonsPickProps) {
  const t = useTranslations("Dashboard.Presents.presentShared");

  return (
    <>
      {!isPickedByMe && !isPickedByOther && (
        <Button onClick={onPick} variant="secondary" className="w-full">
          <PackageOpen className=" size-5 mr-1 stroke-primary" />
          {t("buttons.pick")}
        </Button>
      )}

      {isPickedByMe && (
        <Button
          onClick={onUnPick}
          variant="secondary"
          className="bg-destructive/30 w-full"
        >
          <PackageCheck className=" size-5 mr-1 stroke-destructive" />
          {t("buttons.unPick")}
        </Button>
      )}

      {isPickedByOther && (
        <Button variant="secondary" className="bg-gray-200 w-full" disabled>
          <PackageCheck className=" size-5 mr-1 stroke-muted" />
          {t("buttons.pickedForOther")}
        </Button>
      )}
    </>
  );
}
