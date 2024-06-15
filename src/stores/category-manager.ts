import { Category } from "@prisma/client";
import { create } from "zustand";

export type CategoryState = {
  category: Category | null;
};

type CategoryActions = {
  updateCategory: (category: Category) => void;
  resetCategory: () => void;
};

export type CategoryStore = CategoryState & CategoryActions;

const initialState: CategoryState = {
  category: null,
};

export const useCategoryManager = create<CategoryStore>()((set) => ({
  ...initialState,
  updateCategory: (category: Category) => set({ category }),
  resetCategory: () => set({ category: null }),
}));
