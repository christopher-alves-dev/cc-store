import { ProductWithTotalPrice } from "@/helpers/product";
import { create } from "zustand";
import { cartActions } from "./actions";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartProduct = ProductWithTotalPrice & {
  quantity: number;
};

export type CartSummary = {
  subtotal: number;
  total: number;
  totalDiscount: number;
};

export type CartState = {
  products: CartProduct[];
  summary: CartSummary;
};

type CartActions = {
  addProductToCart: (product: CartProduct) => void;
  decreaseProductQuantity: (product: CartProduct) => void;
  increaseProductQuantity: (product: CartProduct) => void;
  removeProductFromCart: (productId: string) => void;
};

export type CartStore = CartState & CartActions;

const initialState: CartState = {
  products: [],
  summary: {
    subtotal: 0,
    total: 0,
    totalDiscount: 0,
  },
};

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      ...initialState,
      addProductToCart: (product: CartProduct) =>
        set((state) => cartActions.addProductToCart(state.products, product)),
      decreaseProductQuantity: (product: CartProduct) =>
        set((state) =>
          cartActions.decreaseProductFromCart(state.products, product),
        ),
      increaseProductQuantity: (product: CartProduct) =>
        set((state) =>
          cartActions.increaseProductFromCart(state.products, product),
        ),
      removeProductFromCart: (productId: string) =>
        set((state) =>
          cartActions.removeProductFromCart(state.products, productId),
        ),
    }),
    {
      name: "@cc-store/cart-products",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
