import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GiftIcon, ShoppingCartIcon, UsersIcon } from "lucide-react";

export function PresentStats() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Estadísticas de Regalos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="flex items-center">
            <GiftIcon className="h-4 w-4 mr-2 text-primary" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Total de Regalos</p>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
          <div className="flex items-center">
            <ShoppingCartIcon className="h-4 w-4 mr-2 text-primary" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Regalos Comprados</p>
              <p className="text-2xl font-bold">18</p>
            </div>
          </div>
          <div className="flex items-center">
            <UsersIcon className="h-4 w-4 mr-2 text-primary" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Contribuyentes</p>
              <p className="text-2xl font-bold">7</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}