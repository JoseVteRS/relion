import { create } from "zustand";

type OpenListState = {
  id?: string;
  isOpen: boolean;
  onOpen: (is?: string) => void;
  onClose: () => void;
};

export const useOpenListSheetState = create<OpenListState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id?: string) => set({ id, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
