import { parseAsBoolean, useQueryState } from "nuqs";

export const useCreatePresentModal = () => {
  const [isOpen, setIsOpen] = useQueryState(
    "create-present",
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
