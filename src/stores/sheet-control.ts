import { create } from "zustand";

export type SheetControlTypes = "menu" | "products" | "categories";

export type SheetControlState = Record<SheetControlTypes, boolean>;

type SheetControlActions = {
  toggle: (type: SheetControlTypes) => void;
};

export type SheetControlStore = SheetControlState & SheetControlActions;

const initialState: SheetControlState = {
  menu: false,
  products: false,
  categories: false,
};

export const useSheetControl = create<SheetControlStore>()((set) => ({
  ...initialState,
  toggle: (type) =>
    set((state) => ({
      ...state,
      [type]: !state[type],
    })),
}));
