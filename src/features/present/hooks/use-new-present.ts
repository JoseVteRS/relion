import { create } from "zustand";

type NewPresentState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewPresentSheetState = create<NewPresentState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
