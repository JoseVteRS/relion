import { create } from "zustand";

type NewListState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewListStateSheet = create<NewListState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
