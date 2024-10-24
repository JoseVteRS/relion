import { parseAsBoolean, useQueryState } from "nuqs";

export const useCreateListModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "create-list",
    parseAsBoolean.withDefault(false).withOptions({ clearOnDefault: true })
  );
  
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    open,
    close,
    setIsOpen,
  };
};
