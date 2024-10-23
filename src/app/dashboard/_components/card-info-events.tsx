import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";

export function CardInfoEvents() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Próximos Eventos</CardTitle>
        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">3</div>
        <p className="text-xs text-muted-foreground">
          eventos próximos
        </p>
        <div className="mt-4">
          <p className="text-sm font-semibold">Próximo: Cumpleaños de Ana</p>
          <p className="text-xs text-muted-foreground">15 de mayo de 2024</p>
        </div>
      </CardContent>
    </Card>
  );
}