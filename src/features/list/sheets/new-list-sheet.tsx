import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewListStateSheet } from "../hooks/use-new-list";
import { CreateListForm } from "../forms/create-form-list";
import { useCreateList } from "../api/use-create-list";
import { z } from "zod";
import { insertListsSchema } from "@/db/schema";

const formSchema = insertListsSchema
  .pick({
    name: true,
    description: true,
    status: true,
  })
  .extend({
    presentIds: z.array(z.string()).optional(),
  });

type FormValues = z.input<typeof formSchema>;

export const NewListSheet = () => {
  const { isOpen, onClose } = useNewListStateSheet();
  const mutation = useCreateList();

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
          <SheetTitle>Nueva Lista</SheetTitle>
        </SheetHeader>
        <CreateListForm
          onSubmit={onSubmit}
          disabled={false}
          defaultValues={{ name: "" }}
        />
      </SheetContent>
    </Sheet>
  );
};
