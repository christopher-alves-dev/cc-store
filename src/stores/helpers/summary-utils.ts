import { CartProduct, CartSummary } from "../cart";

type CalculateSummaryProps = Pick<
  CartProduct,
  "basePrice" | "totalPrice" | "quantity"
>;

const calculateSubtotal = (
  products: Array<Omit<CalculateSummaryProps, "totalPrice">>,
): number => {
  if (products.length === 0) return 0;

  const cartSubtotal = products.reduce((acc, product) => {
    return acc + Number(product.basePrice) * product.quantity;
  }, 0);

  return cartSubtotal;
};

const calculateTotal = (
  products: Array<Omit<CalculateSummaryProps, "basePrice">>,
): number => {
  if (products.length === 0) return 0;

  const cartSubtotal = products.reduce((acc, product) => {
    return acc + product.totalPrice * product.quantity;
  }, 0);

  return cartSubtotal;
};

export const updateSummary = (
  products: Array<CalculateSummaryProps>,
): CartSummary => {
  const subtotal = calculateSubtotal(products);
  const total = calculateTotal(products);
  const totalDiscount = subtotal - total;

  return {
    subtotal,
    total,
    totalDiscount,
  };
};
