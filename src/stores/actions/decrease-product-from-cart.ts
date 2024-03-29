import { CartProduct } from "../cart";
import { updateSummary } from "../helpers/summary-utils";

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

  const summary = updateSummary(updatedProductList);

  return {
    summary,
    products: updatedProductList,
  };
};
