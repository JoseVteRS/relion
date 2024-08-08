import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewPresentSheetState } from "../hooks/use-new-present";
import { CreateListForm } from "../forms/create-form-present";
import { useCreatePresent } from "../api/use-create-present";
import { insertPresentSchema } from "@/db/schema";
import { z } from "zod";

const formSchema = insertPresentSchema.pick({
  name: true,
  link: true,
  description: true,
  status: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewPresentSheet = () => {
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
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side={"bottom"} className="rounded-t-xl">
        <SheetHeader>
          <SheetTitle>Nuevo regalo</SheetTitle>
        </SheetHeader>
        <CreateListForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{ name: "", link: "", desciption: "", status: true }}
        />
      </SheetContent>
    </Sheet>
  );
};
