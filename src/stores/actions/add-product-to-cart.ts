import { CartProduct } from "../cart";
import { updateCartSummary } from "../helpers/cart-summary-utils";

export const addProductToCart = (
  products: CartProduct[],
  product: CartProduct,
) => {
  const productIsAlreadyOnCart = products.some(
    (cartProduct) => cartProduct.id === product.id,
  );

  const productsList = productIsAlreadyOnCart
    ? products.map((cartProduct) => {
        if (cartProduct.id === product.id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + product.quantity,
          };
        }

        return cartProduct;
      })
    : [...products, product];

  const summary = updateCartSummary(productsList);

  return {
    summary,
    products: productsList,
  };
};
