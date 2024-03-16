import { ProductWithTotalPrice } from "@/helpers/product";
import { create } from "zustand";
import { cartActions } from "./actions";

export type CartProduct = ProductWithTotalPrice & {
  quantity: number;
};

export type CartSummary = {
  subtotal: number;
  total: number;
  totalDiscount: number;
};

type CartState = {
  products: CartProduct[];
  cartTotalPrice: number;
  cartBasePrice: number;
  cartTotalDiscount: number;
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
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
  summary: {
    subtotal: 0,
    total: 0,
    totalDiscount: 0,
  },
};

export const useCartStore = create<CartStore>((set) => ({
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
}));
