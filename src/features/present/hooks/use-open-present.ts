import { create } from "zustand";

type OpenPresentState = {
  id?: string;
  isOpen: boolean;
  onOpen: (is?: string) => void;
  onClose: () => void;
};

export const useOpenPresentSheetState = create<OpenPresentState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id?: string) => set({ id, isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
