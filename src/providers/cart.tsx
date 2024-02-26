"use client";

import { Product } from "@prisma/client";
import { ReactNode, createContext } from "react";

type CartProduct = Product & {
  quantity: number;
};

type ICartContext = {
  products: CartProduct[];
  cartTotalPrice: number;
  cartBasePrice: number;
  cartTotalDiscount: number;
};

const CartContext = createContext<ICartContext>({
  products: [],
  cartTotalPrice: 0,
  cartBasePrice: 0,
  cartTotalDiscount: 0,
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  return (
    <CartContext.Provider
      value={{
        products: [],
        cartTotalPrice: 0,
        cartBasePrice: 0,
        cartTotalDiscount: 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
