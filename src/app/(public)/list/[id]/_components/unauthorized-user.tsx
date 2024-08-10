import { Button } from "@/components/ui/button";
import { useCreateGuest } from "@/features/auth/api/use-create-guest";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useMemo } from "react";

export const UnauthorizedUser = ({ listId }: { listId: string }) => {
  //TODO: crear un guest y guardar el id en el local storage
  const createGuest = useCreateGuest();

  const handleCreateGuest = () => {
    createGuest.mutate(undefined, {
      onSuccess: (data) => {
        redirect(`/list/${listId}`);
      },
    });
  };

  return (
    <div className="h-full">
      <div className="h-full flex flex-col items-center justify-center gap-5">
        <header>
          <div className="text-2xl text-center">No has iniciado sesión</div>
          <p className="text-sm text-center text-muted-foreground mt-2">
            Si tienes una cuenta, inicia sesión para ver los regalos que vas
            hacer. Tu cuenta y tu cuenta invitado no se vinculan.
          </p>
        </header>
        <div className="flex justify-between items-center gap-2 w-full">
          <Button variant="link" className="w-full" onClick={handleCreateGuest}>
            Seguir como invitado
          </Button>
        </div>
        <div className="w-full flex items-center justify-between gap-2">
          <Button variant="outline" className="w-full" asChild>
            <Link
              href={`/sign-in?callbackUrl=${process.env
                .NEXT_PUBLIC_APP_URL!}/list/${listId}`}
            >
              Iniciar sesión
            </Link>
          </Button>
          <Button variant="primary" className="w-full" asChild>
            <Link href="/sign-up">Crear cuenta</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
