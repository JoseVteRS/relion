import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCreatePick } from "@/features/pick/api/use-create-pick";
import { useDeletePick } from "@/features/pick/api/use-delete-pick";
import { cn } from "@/lib/utils";
import { LinkIcon, PackageCheck, PackageOpen } from "lucide-react";
import { useTranslations } from "next-intl";
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

  const t = useTranslations("Dashboard.Presents.presentShared");

  const pick = useCreatePick(present.id, listId);
  const unpick = useDeletePick(present.id, listId);
  const isPickedOwner = present.pickedBy === authUserId;

  const onPick = () => {
    pick.mutate(undefined);
  };

  const onUnPick = () => {
    unpick.mutate(undefined);
  };

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

      <CardFooter
        className={cn(
          "flex items-center",
          !present.link ? "justify-end" : "justify-between"
        )}
      >
        {present.link && (
          <Button
            className="text-xs underline md:no-underline m-0 p-0"
            size="sm"
            variant="link"
            asChild
          >
            <Link
              href={present.link}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <LinkIcon className="w-3 h-3 mr-1" />
              {new URL(present.link).hostname}
            </Link>
          </Button>
        )}
        <div className="">
          {present.isPicked ? (
            <Button
              variant="secondary"
              className="flex items-center gap-2 w-full bg-destructive"
              onClick={onUnPick}
              disabled={!isPickedOwner}
            >
              <PackageCheck className="text-red-500" />
              <span className="text-xs">
                {isPickedOwner ? t("buttons.unPick") : t("buttons.pickedForOther")}
              </span>
            </Button>
          ) : (
            <Button
              variant="secondary"
              className="flex items-center gap-2 w-fit"
              onClick={onPick}
            >
              <PackageOpen className="text-green-500" />
              <span className="text-xs">{t("buttons.pick")}</span>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};