import { CartProduct, CartSummary } from "../cart";

const calculateSubtotal = (
  products: CartProduct[],
  productBasePrice: number,
  quantity: number,
): number => {
  const productSubtotal = productBasePrice * quantity;

  if (products.length === 0) {
    return productSubtotal;
  }

  const cartSubtotal = products.reduce((acc, product) => {
    return acc + Number(product.basePrice) * product.quantity;
  }, 0);

  return cartSubtotal + productSubtotal;
};

const calculateTotal = (
  products: CartProduct[],
  productTotalPrice: number,
  quantity = 1,
): number => {
  const productPrice = productTotalPrice * quantity;

  if (products.length === 0) {
    return productPrice;
  }

  const cartSubtotal = products.reduce((acc, product) => {
    return acc + product.totalPrice * product.quantity;
  }, 0);

  return cartSubtotal + productPrice;
};

export const updateCartSummary = (
  products: CartProduct[],
  productAdded: CartProduct,
): CartSummary => {
  const subtotal = calculateSubtotal(
    products,
    Number(productAdded.basePrice),
    productAdded.quantity,
  );
  const total = calculateTotal(
    products,
    productAdded.totalPrice,
    productAdded.quantity,
  );
  const totalDiscount = subtotal - total;

  return {
    subtotal,
    total,
    totalDiscount,
  };
};
