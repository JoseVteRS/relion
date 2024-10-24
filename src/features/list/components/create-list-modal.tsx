"use client";
import { ResponsiveModal } from "@/components/common/responsive-modal";
import { CreateListForm } from "../forms/create-form-list";
import { useCreateListModal } from "../hooks/use-create-list-modal";

export const CreateListModal = () => {
  const { isOpen, setIsOpen, close } = useCreateListModal();
  return (
    <ResponsiveModal open={isOpen} onOpenChange={setIsOpen} title="Añadir lista">
      <CreateListForm onCancel={close} />
    </ResponsiveModal>
  );
};
