import { ProductWithTotalPrice } from "@/helpers/product";
import { create } from "zustand";
import { updateCartSummary } from "./helpers/cart-summary-utils";
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
  decreaseProductQuantity: (productId: string) => void;
  increaseProductQuantity: (productId: string) => void;
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
  decreaseProductQuantity: (productId: string) =>
    set((state) => {
      return {
        ...state,
        products: state.products.map((cartProduct) => {
          if (cartProduct.id === productId) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity - 1,
            };
          }

          return cartProduct;
        }),
      };
    }),
  increaseProductQuantity: (productId: string) =>
    set((state) => {
      return {
        ...state,
        products: state.products.map((cartProduct) => {
          if (cartProduct.id === productId) {
            return {
              ...cartProduct,
              quantity: cartProduct.quantity - 1,
            };
          }

          return cartProduct;
        }),
      };
    }),
  removeProductFromCart: (productId: string) =>
    set((state) => {
      return {
        ...state,
        products: state.products.filter((product) => product.id !== productId),
      };
    }),
}));
