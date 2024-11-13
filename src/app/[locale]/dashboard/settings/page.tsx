import { TitlePage } from "@/components/common/page-title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between mb-10">
        <TitlePage>Ajustes</TitlePage>
      </header>

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Configuración General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="theme-toggle" className="text-lg font-medium">Tema</Label>
              <p className="text-sm text-muted-foreground">Cambia entre modo claro y oscuro</p>
            </div>
            THEME TOGGLE
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div>
                <Label htmlFor="notifications" className="text-lg font-medium">Notificaciones</Label>
                <p className="text-sm text-muted-foreground">Recibe alertas sobre tus listas y regalos</p>
              </div>
              <Badge variant="outline">Muy pronto</Badge>
            </div>
            <Switch id="notifications" disabled />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div>
                <Label htmlFor="privacy" className="text-lg font-medium">Privacidad</Label>
                <p className="text-sm text-muted-foreground">Haz tus listas visibles solo para ti</p>
              </div>
              <Badge variant="outline">Muy pronto</Badge>
            </div>
            <Switch id="privacy" disabled />
          </div>
          <Button className="w-full">Guardar preferencias</Button>
        </CardContent>
      </Card>
    </div>
  );
}