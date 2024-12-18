import { auth } from "@/auth";
import { TitlePage } from "@/components/common/page-title";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CameraIcon, User } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth();

  return (
    <div>
      <header className="flex items-center justify-between mb-10">
        <TitlePage>Perfil</TitlePage>
      </header>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Información Personal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={session?.user?.image || ""} alt="Foto de perfil" />
              <AvatarFallback>
                <User className="w-12 h-12 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" value={session?.user?.name || ""} readOnly disabled />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" value={session?.user?.email || ""} readOnly disabled />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}