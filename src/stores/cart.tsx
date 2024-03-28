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
  updateLocalStorage: (products: CartProduct[]) => void;
};

export type CartStore = CartState & CartActions;

const productsOnLocalStorage = JSON.parse(
  localStorage.getItem("@cc-store/cart-products") || "[]",
);

const initialState: CartState = {
  products: productsOnLocalStorage,
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
    set((state) => {
      const data = cartActions.addProductToCart(state.products, product);
      state.updateLocalStorage(data.products);

      return data;
    }),
  decreaseProductQuantity: (product: CartProduct) =>
    set((state) => {
      const data = cartActions.decreaseProductFromCart(state.products, product);

      state.updateLocalStorage(data.products);

      return data;
    }),
  increaseProductQuantity: (product: CartProduct) =>
    set((state) => {
      const data = cartActions.increaseProductFromCart(state.products, product);

      state.updateLocalStorage(data.products);

      return data;
    }),
  removeProductFromCart: (productId: string) =>
    set((state) => {
      const data = cartActions.removeProductFromCart(state.products, productId);

      state.updateLocalStorage(data.products);

      return data;
    }),
  updateLocalStorage: (products: CartProduct[]) => {
    localStorage.setItem("@cc-store/cart-products", JSON.stringify(products));
  },
}));
