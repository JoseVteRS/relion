import React from "react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BoxIcon, ListIcon, PencilIcon } from "lucide-react";
import { useSubscriptionModalStore } from "../store/use-subscription-modal.store";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export const ReachedLimitPremiumModal = () => {
  const { isOpen, onClose } = useSubscriptionModalStore();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex flex-col items-center gap-y-4">
          <Image src="/logo.png" alt="Logo" width={48} height={48} />
          <DialogTitle className="text-center text-2xl font-semibold">
            ¡Wow, eres todo un experto en listas!
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            Has alcanzado el límite de listas en tu plan premium.
            ¡Impresionante!
          </DialogDescription>
        </DialogHeader>
        <Separator className="my-4" />
        <div className="space-y-4">
          <p className="text-center text-neutral-200">
            Estamos encantados de ver que aprovechas al máximo nuestro servicio.
            Por ahora, este es nuestro plan más completo, pero estamos
            trabajando en nuevas funcionalidades.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center">
              <ListIcon className="size-6 mr-3 stroke-primary" />
              <p className="text-sm text-neutral-200">
                Has creado el máximo de listas permitidas
              </p>
            </li>
            <li className="flex items-center">
              <BoxIcon className="size-6 mr-3 stroke-primary" />
              <p className="text-sm text-neutral-200">
                Puedes seguir añadiendo regalos a tus listas existentes
              </p>
            </li>
            <li className="flex items-center">
              <PencilIcon className="size-6 mr-3 stroke-primary" />
              <p className="text-sm text-neutral-200">
                Edita y organiza tus listas actuales
              </p>
            </li>
          </ul>
        </div>
        <DialogFooter className="pt-6 mt-4">
          <Button className="w-full font-semibold text-lg" onClick={onClose}>
            Entendido, ¡gracias!
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
