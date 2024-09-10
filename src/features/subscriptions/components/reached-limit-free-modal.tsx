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
import { BoxIcon, CheckCircle2, ListIcon, PencilIcon } from "lucide-react";
import { useSubscriptionModalStore } from "../store/use-subscription-modal.store";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useCheckoutSubscription } from "../api/use-checkout-subscription";

export const ReachedLImitFreeModal = () => {
  const checkout = useCheckoutSubscription();
  const { isOpen, onClose } = useSubscriptionModalStore();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex flex-col items-center gap-y-4">
          <Image src="/logo.png" alt="Logo" width={48} height={48} />
          <DialogTitle className="text-center text-2xl font-semibold">
            ¡Vaya, qué popular eres!
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            Has alcanzado el límite de listas en tu plan actual. ¡Genial!
          </DialogDescription>
        </DialogHeader>
        <Separator className="my-4" />
        <div className="space-y-4">
          <p className="text-center text-neutral-200">
            ¿Qué te parece si ampliamos tus posibilidades? Con nuestro plan
            premium podrás:
          </p>
          <ul className="space-y-3">
            <li className="flex items-center">
              <ListIcon className="size-6 mr-3 stroke-primary" />
              <p className="text-sm text-neutral-200">
                Crear todas las listas que quieras
              </p>
            </li>
            <li className="flex items-center">
              <BoxIcon className="size-6 mr-3 stroke-primary" />
              <p className="text-sm text-neutral-200">
                Añadir regalos sin límites
              </p>
            </li>
            <li className="flex items-center">
              <PencilIcon className="size-6 mr-3 stroke-primary" />
              <p className="text-sm text-neutral-200">
                Editar tus listas cuando lo necesites
              </p>
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="size-6 mr-3 stroke-primary" />
              <p className="text-sm text-neutral-200">
                Apoyar a un desarrollador independiente (¡gracias!)
              </p>
            </li>
          </ul>
        </div>
        <DialogFooter className="pt-6 mt-4">
          <Button
            className="w-full font-semibold text-lg"
            onClick={() => checkout.mutate()}
            disabled={checkout.isPending}
          >
            Desbloquea todo por solo 1,90€ / mes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
