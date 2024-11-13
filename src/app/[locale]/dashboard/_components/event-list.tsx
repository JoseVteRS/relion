import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, GiftIcon } from "lucide-react";

export function EventList() {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <Card key={event.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{event.name}</h3>
                  <p className="text-sm text-muted-foreground">{event.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">
                  <GiftIcon className="h-3 w-3 mr-1" />
                  {event.gifts} regalos
                </Badge>
                <Badge
                  variant={event.status === "Próximo" ? "default" : "outline"}
                >
                  {event.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

const events = [
  {
    id: 1,
    name: "Cumpleaños de Ana",
    date: "15 de mayo, 2024",
    gifts: 5,
    status: "Próximo",
  },
  {
    id: 2,
    name: "Boda de Pepito y María",
    date: "22 de junio, 2024",
    gifts: 12,
    status: "Planificando",
  },
  {
    id: 3,
    name: "Baby Shower de Laura",
    date: "10 de julio, 2024",
    gifts: 8,
    status: "Próximo",
  },
  {
    id: 4,
    name: "Aniversario de Pedro y Lucía",
    date: "5 de agosto, 2024",
    gifts: 3,
    status: "Planificando",
  },
];
