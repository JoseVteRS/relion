"use client";

import { ResponsiveModal } from "@/components/common/responsive-modal";
import { CreatePresentForm } from "../forms/create-form-present";
import { useCreatePresentModal } from "../hooks/use-create-present-modal";

export const CreatePresentModal = () => {
  const { isOpen, setIsOpen, close } = useCreatePresentModal();

  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen} title="Regalo">
      <CreatePresentForm onCancel={close} />
    </ResponsiveModal>
  );
};
