import { LocaleSwitcher } from "@/components/common/locale-switcher";
import { ModeToggle } from "@/components/common/mode-toggle";
import { TitlePage } from "@/components/common/page-title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function SettingsPage() {
  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between mb-10">
        <TitlePage>Ajustes</TitlePage>
      </header>

      <Card className="w-full max-w-2xl mx-auto mb-5">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Idioma
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <LocaleSwitcher />
          </div>
        </CardContent>
      </Card>
      
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Tema
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-4">
            <ModeToggle  />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
