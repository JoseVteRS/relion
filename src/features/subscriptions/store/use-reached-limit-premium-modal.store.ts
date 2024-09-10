import { create } from "zustand";

type ReachedLimitModalState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useReachedLimitPremiumModalStore = create<ReachedLimitModalState>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  })
);
