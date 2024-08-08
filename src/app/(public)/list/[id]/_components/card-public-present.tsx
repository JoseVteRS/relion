import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
import Link from "next/link";

interface CardPublicPresentProps {
  present: any;
}

export const CardPublicPresent = ({ present }: CardPublicPresentProps) => {
  return (
    <Card
      className={cn("w-full", present.isPicked && "opacity-60 border-dashed")}
    >
      <CardHeader>
        <div className="flex items-start">
          <div className="flex flex-col flex-1 items-start gap-1">
            <CardTitle className=" text-2xl">{present.name}</CardTitle>
          </div>
          <div>
            {present.isPicked ? (
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
              >
                <PackageCheck className="text-red-500" />
                <span className="text-xs">Pillado</span>
              </Button>
            ) : (
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
              >
                <PackageOpen className="text-green-500" />
                <span className="text-xs">¡Me lo pido!</span>
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <div className="mt-1 text-neutral-100 ">
            <p className="text-md leading-7">{present.description}</p>
          </div>
        </div>
      </CardContent>

      {present.link && (
        <CardFooter className="m-5">
          <div className="w-full flex items-center justify-end  gap-2">
            <Button
              className="text-xs flex items-center gap-2"
              size="sm"
              variant="outline"
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
        </CardFooter>
      )}
    </Card>
  );
};
