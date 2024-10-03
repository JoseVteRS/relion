import Link from "next/link";
import { Calendar, GiftIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/common/status-badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/components/ui/button";

interface CardListProps {
  list: { name: string; eventDate: string; id: string };
}

export const CardFirstList = ({ list }: CardListProps) => {
  return (
    <>
      <Card className="w-full bg-card text-card-foreground rounded-lg overflow-hidden cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold">{list.name}</h3>
              <StatusBadge status={true} />
            </div>
            <div className="flex items-center space-x-2"></div>
          </div>
          <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>
              {format(new Date(list.eventDate), "PPP", { locale: es })}
            </span>
          </div>

          <div className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
            <GiftIcon className="w-4 h-4" />
            Sin regalos
            <Button asChild variant="default" size="sm">
              <Link href="/sign-up">Crea tu primer regalo</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
