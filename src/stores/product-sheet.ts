import { create } from "zustand";

export type ProductSheetState = {
  isOpen: boolean;
};

type ProductSheetActions = {
  toggle: (condition: boolean) => void;
};

export type ProductSheetStore = ProductSheetState & ProductSheetActions;

const initialState: ProductSheetState = {
  isOpen: false,
};

export const useProductSheet = create<ProductSheetStore>()((set) => ({
  ...initialState,
  toggle: (condition) => set({ isOpen: condition }),
}));
