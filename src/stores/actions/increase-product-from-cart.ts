import { CartProduct } from "../cart";
import { updateCartSummary } from "../helpers/cart-summary-utils";

export const increaseProductFromCart = (
  productList: CartProduct[],
  productToIncrease: CartProduct,
) => {
  const updatedProductList = productList.map((cartProduct) => {
    if (cartProduct.id === productToIncrease.id) {
      return {
        ...cartProduct,
        quantity: cartProduct.quantity + 1,
      };
    }

    return cartProduct;
  });

  const summary = updateCartSummary(updatedProductList);

  return {
    summary,
    products: updatedProductList,
  };
};
