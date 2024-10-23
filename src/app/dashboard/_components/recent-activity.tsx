import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/01.png" alt="Avatar" />
              <AvatarFallback>OM</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Olivia Martínez</p>
              <p className="text-sm text-muted-foreground">
                añadió un regalo a tu lista "Cumpleaños 30"
              </p>
            </div>
            <div className="ml-auto font-medium">
              Hace 5 min
            </div>
          </div>
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/02.png" alt="Avatar" />
              <AvatarFallback>JL</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Juan López</p>
              <p className="text-sm text-muted-foreground">
                creó una nueva lista "Boda"
              </p>
            </div>
            <div className="ml-auto font-medium">
              Hace 2 horas
            </div>
          </div>
          <div className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/avatars/03.png" alt="Avatar" />
              <AvatarFallback>CG</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">Carmen García</p>
              <p className="text-sm text-muted-foreground">
                compartió su lista "Baby Shower" contigo
              </p>
            </div>
            <div className="ml-auto font-medium">
              Ayer
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}