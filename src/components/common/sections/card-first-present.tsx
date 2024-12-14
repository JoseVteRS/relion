import { StatusBadge } from "@/components/common/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { List, Present } from "@prisma/client";
import {
  LinkIcon,
} from "lucide-react";
import Link from "next/link";

export type PresentWithList = Present & {
  list: List;
};

interface CardPresentProps {
  present: PresentWithList;
}

export const CardFirstPresent = ({ present }: CardPresentProps) => {
  return (
    <>
      <Card className="w-full bg-card text-card-foreground shadow-md hover:shadow-lg transition-shadow duration-300 rounded-lg overflow-hidden mt-2">
        <CardContent className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold">{present.name}</h3>
              <StatusBadge status={present.status} />
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-3 line-clamp-2 w-full flex items-start justify-between">
            {present.description}
          </p>

          {present.list && (
            <Link
              href={`/dashboard/lists/${present.list.id}`}
              className="text-sm text-primary hover:underline mb-3 inline-block"
            >
              {present.list.name}
            </Link>
          )}

          {present.link && (
            <Link
              href={present.link}
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <LinkIcon className="w-3 h-3 mr-1" />
              {new URL(present.link).hostname}
            </Link>
          )}
        </CardContent>
      </Card>
    </>
  );
};
