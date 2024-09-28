import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ListWithUserWithPresents } from "@/types/types";
import { Separator } from "@radix-ui/react-select";
import { CalendarIcon, InfoIcon, UserIcon } from "lucide-react";

interface HeaderListPublicProps {
  list: ListWithUserWithPresents;
}

export const HeaderListPublic = ({ list }: HeaderListPublicProps) => {
  return (
    <header className="bg-card/50 p-4 sm:p-6 rounded-lg shadow-sm mb-6">
      <div className="flex flex-col gap-4 max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground text-center">
          {list?.name}
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-muted-foreground text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <UserIcon className="size-4 sm:size-5" />
            <span>{list?.user.name}</span>
          </div>

          {list?.eventDate && (
            <div className="flex items-center gap-2">
              <CalendarIcon className="size-4 sm:size-5" />
              <time dateTime={list.eventDate.toISOString()}>
                {new Date(list.eventDate).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </div>
          )}
        </div>

        {list?.description && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-start gap-3 text-sm text-muted-foreground">
              <InfoIcon className="size-5 mt-0.5 flex-shrink-0" />
              <p className="flex-grow">{list.description}</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
