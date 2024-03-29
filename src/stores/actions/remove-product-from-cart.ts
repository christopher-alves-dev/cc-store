import { CartProduct } from "../cart";
import { updateSummary } from "../helpers/summary-utils";

export const removeProductFromCart = (
  productList: CartProduct[],
  productIdToRemove: string,
) => {
  const updatedProductList = productList.filter(
    (product) => product.id !== productIdToRemove,
  );

  const summary = updateSummary(updatedProductList);

  return {
    summary,
    products: updatedProductList,
  };
};
