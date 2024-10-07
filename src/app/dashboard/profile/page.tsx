import { Plus } from "lucide-react";
import { TitlePage } from "@/components/common/page-title";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/auth";

export default async function ProfilePage() {
  const session = await auth();

  return (
    <div className="">
      <header className="flex items-center justify-between mb-10">
        <TitlePage>Perfil</TitlePage>
      </header>

      <div>
        <h2 className="text-lg form-">Información</h2>
        <fieldset>
          <legend>Foto de perfil</legend>
          <div className="flex items-center justify-center">
            <Plus className="w-10 h-10 text-primary" />
          </div>
        </fieldset>
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
