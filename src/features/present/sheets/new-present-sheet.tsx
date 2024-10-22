import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { insertPresentSchema } from "@/db/schema";
import { z } from "zod";
import { useCreatePresent } from "../api/use-create-present";
import { CreatePresentForm } from "../forms/create-form-present";
import { useNewPresentSheetState } from "../hooks/use-new-present";

const formSchema = insertPresentSchema.pick({
  name: true,
  link: true,
  description: true,
  status: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewPresentSheet = ({ isMobile }: { isMobile?: boolean }) => {
  const { isOpen, onClose } = useNewPresentSheetState();
  const mutation = useCreatePresent();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="rounded-t-xl">
        <DrawerHeader>
          <DrawerTitle>Nuevo regalo</DrawerTitle>
        </DrawerHeader>
        <CreatePresentForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{ name: "", link: "", desciption: "", status: true }}
        />
      </DrawerContent>
    </Drawer>
  );
};
