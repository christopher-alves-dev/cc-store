import { CartProduct, CartSummary } from "../cart";

const calculateSubtotal = (products: CartProduct[]): number => {
  if (products.length === 0) return 0;

  const cartSubtotal = products.reduce((acc, product) => {
    return acc + Number(product.basePrice) * product.quantity;
  }, 0);

  return cartSubtotal;
};

const calculateTotal = (products: CartProduct[]): number => {
  if (products.length === 0) return 0;

  const cartSubtotal = products.reduce((acc, product) => {
    return acc + product.totalPrice * product.quantity;
  }, 0);

  return cartSubtotal;
};

export const updateCartSummary = (products: CartProduct[]): CartSummary => {
  const subtotal = calculateSubtotal(products);
  const total = calculateTotal(products);
  const totalDiscount = subtotal - total;

  return {
    subtotal,
    total,
    totalDiscount,
  };
};
