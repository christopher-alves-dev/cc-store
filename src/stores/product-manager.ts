import { ProductWithTotalPriceAndCategory } from "@/types/product";
import { create } from "zustand";

export type ProductState = {
  product: ProductWithTotalPriceAndCategory | null;
};

type ProductActions = {
  updateProduct: (product: ProductWithTotalPriceAndCategory) => void;
  resetProduct: () => void;
};

export type ProductStore = ProductState & ProductActions;

const initialState: ProductState = {
  product: null,
};

export const useProductManager = create<ProductStore>()((set) => ({
  ...initialState,
  updateProduct: (product: ProductWithTotalPriceAndCategory) =>
    set({ product }),
  resetProduct: () => set({ product: null }),
}));
