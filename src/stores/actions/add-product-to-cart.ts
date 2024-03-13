import { CartProduct } from "../cart";
import { updateCartSummary } from "../helpers/cart-summary-utils";

export const addProductToCart = (
  products: CartProduct[],
  product: CartProduct,
) => {
  const productIsAlreadyOnCart = products.some(
    (cartProduct) => cartProduct.id === product.id,
  );

  const summary = updateCartSummary(products, product);
  if (!productIsAlreadyOnCart) {
    return {
      summary,
      products: [...products, product],
    };
  }

  return {
    summary,
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
