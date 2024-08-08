import { Plus } from "lucide-react";
import { TitlePage } from "@/components/common/page-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/auth";

export default async function ProfilePage() {
  const session = await auth();

  return (
    <div className="bg-background min-h-screen">
      <header className="flex flex-col items-start justify-between mb-10 sticky top-0 py-5 bg-background">
        <TitlePage>Perfil</TitlePage>
        <h2 className="text-xl">{session?.user?.name || ""}</h2>
      </header>

      <div>
        <h2 className="text-lg form-">Información</h2>
        <div className="space-y-4">
          <div>
            <Label>Nombre</Label>
            <Input value={session?.user?.name || ""} />
          </div>
          <div>
            <Label>Nombre</Label>
            <Input value={session?.user?.email || ""} />
          </div>
        </div>
      </div>
    </div>
  );
}
