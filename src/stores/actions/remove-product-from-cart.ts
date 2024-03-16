import { CartProduct } from "../cart";
import { updateCartSummary } from "../helpers/cart-summary-utils";

export const removeProductFromCart = (
  productList: CartProduct[],
  productIdToRemove: string,
) => {
  const updatedProductList = productList.filter(
    (product) => product.id !== productIdToRemove,
  );

  const summary = updateCartSummary(updatedProductList);

  return {
    summary,
    products: updatedProductList,
  };
};
