import { CartProduct } from "../cart";
import { updateCartSummary } from "../helpers/cart-summary-utils";

export const addProductToCart = (
  products: CartProduct[],
  product: CartProduct,
) => {
  const productIsAlreadyOnCart = products.some(
    (cartProduct) => cartProduct.id === product.id,
  );

  const cartSummary = updateCartSummary(products, product);
  if (!productIsAlreadyOnCart) {
    return {
      ...cartSummary,
      products: [...products, product],
    };
  }

  return {
    ...products,
    ...cartSummary,
    products: products.map((cartProduct) => {
      if (cartProduct.id === product.id) {
        return {
          ...cartProduct,
          quantity: cartProduct.quantity + product.quantity,
        };
      }

      return cartProduct;
    }),
  };
};
