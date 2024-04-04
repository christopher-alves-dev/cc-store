import { Product } from "@prisma/client";

export type ProductWithTotalPrice = Product & {
  totalPrice: number;
};

export const computeProductTotalPrice = (
  product: Pick<Product, "discountPercentage" | "basePrice">,
): number => {
  const productBasePrice = Number(product.basePrice);
  if (product.discountPercentage === 0) {
    return productBasePrice;
  }

  const totalDiscount = productBasePrice * (product.discountPercentage / 100);

  return productBasePrice - totalDiscount;
};
