import { CartProduct } from "../cart";
import { updateSummary } from "../helpers/summary-utils";

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

  const summary = updateSummary(updatedProductList);

  return {
    summary,
    products: updatedProductList,
  };
};
