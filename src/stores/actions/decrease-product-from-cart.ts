import { CartProduct } from "../cart";
import { updateCartSummary } from "../helpers/cart-summary-utils";

export const decreaseProductFromCart = (
  productList: CartProduct[],
  productToDecrease: CartProduct,
) => {
  const updatedProductList = productList.map((cartProduct) => {
    if (cartProduct.id === productToDecrease.id) {
      return {
        ...cartProduct,
        quantity: cartProduct.quantity - 1,
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
