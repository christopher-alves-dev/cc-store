import { create } from "zustand";

export type SheetControlState = {
  isOpen: boolean;
};

type SheetControlActions = {
  toggle: (condition: boolean) => void;
};

export type SheetControlStore = SheetControlState & SheetControlActions;

const initialState: SheetControlState = {
  isOpen: false,
};

export const useSheetControl = create<SheetControlStore>()((set) => ({
  ...initialState,
  toggle: (condition) => set({ isOpen: condition }),
}));
