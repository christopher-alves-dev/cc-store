import { ProductWithTotalPrice } from "@/helpers/product";
import { Category } from "@prisma/client";

export type ProductWithTotalPriceAndCategory = ProductWithTotalPrice & {
  category: Category;
};
