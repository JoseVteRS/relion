import { create } from "zustand";

type ReachedLimitModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useReachedLimitFreeModalStore = create<ReachedLimitModalState>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);
