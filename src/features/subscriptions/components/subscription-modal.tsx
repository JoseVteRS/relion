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
import Logo from "@/components/common/logo/logo";

export const SubscriptionModal = () => {
  const checkout = useCheckoutSubscription();
  const { isOpen, onClose } = useSubscriptionModalStore();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="flex items-center gap-y-4">
          <Logo />
          <DialogTitle className="text-center">Mejora tu plan</DialogTitle>
          <DialogDescription className="text-center">
            Mejora tu plan para disfrutar de más funciones
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <ul className="space-y-2">
          <li className="flex items-center">
            <ListIcon className="size-5 mr-2 stroke-primary text-white" />
            <p className="text-sm text-neutral-200 font-normal">
              Crea listas ilimitadas
            </p>
          </li>
          <li className="flex items-center">
            <BoxIcon className="size-5 mr-2 stroke-primary text-white" />
            <p className="text-sm text-neutral-200 font-normal">
              Crea regalos ilimitados
            </p>
          </li>
          <li className="flex items-center">
            <PencilIcon className="size-5 mr-2 stroke-primary text-white" />
            <p className="text-sm text-neutral-200 font-normal">
              Permite editar listas
            </p>
          </li>
          <li className="flex items-center">
            <PencilIcon className="size-5 mr-2 stroke-primary text-white" />
            <p className="text-sm text-neutral-200 font-normal">
              Permite editar regalos
            </p>
          </li>
          <li className="flex items-center">
            <CheckCircle2 className="size-5 mr-2 stroke-primary text-white" />
            <p className="text-sm text-neutral-200 font-normal">
              Apoyar a un desarrollador independiente
            </p>
          </li>
        </ul>
        <DialogFooter className="pt-2 mt-4 gap-y-2">
          <Button
            className="w-full  font-semibold text-md"
            onClick={() => checkout.mutate()}
            disabled={checkout.isPending}
          >
            Mejorar por 1,90€ / mes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
