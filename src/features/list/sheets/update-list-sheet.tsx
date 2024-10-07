import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useOpenListSheetState } from "../hooks/use-open-list";
import { UpdateListForm } from "../forms/update-form-list";
import { useUpdateList } from "../api/use-update-list";
import { useGetUserList } from "../api/use-get-user-list";
import { Loader2 } from "lucide-react";
import { FormValuesUpdateList } from "../forms/form-schemas";

interface UpdateListSheetProps {
  isMobile?: boolean;
}

export const UpdateListSheet = ({ isMobile }: UpdateListSheetProps) => {
  const { isOpen, onClose, id } = useOpenListSheetState();
  const mutation = useUpdateList(id);

  const listQuery = useGetUserList(id);

  const onSubmit = (values: FormValuesUpdateList) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const isLoading = listQuery.isLoading;
  const isDisabled = mutation.isPending || isLoading;

  const defaultValues = listQuery?.data
    ? listQuery.data
    : { name: "", description: "", status: true, presentIds: [] };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side={isMobile ? "right" : "right"}
        className="rounded-t-xl"
      >
        <SheetHeader>
          <SheetTitle>Actualiza la lista</SheetTitle>
        </SheetHeader>

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 animate-spin" />
          </div>
        ) : (
          <UpdateListForm
            onSubmit={onSubmit}
            disabled={isDisabled}
            defaultValues={defaultValues}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
