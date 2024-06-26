"use client";

import { useProductManager } from "@/stores/product-manager";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { maskCurrency } from "../../helpers/masks";
import { ProductsSchemaType, productsSchema } from "../schema";

export const useProductsForm = () => {
  const product = useProductManager((state) => state.product);

  let productBasePrice;

  if (product?.basePrice) {
    const productPriceHaveCents = Number(product.basePrice) % 1 !== 0;

    productBasePrice = product.basePrice;

    if (!productPriceHaveCents) {
      productBasePrice = `${product.basePrice}.00`;
    }
  }

  const formMethods = useForm<ProductsSchemaType>({
    resolver: zodResolver(productsSchema),
    defaultValues: {
      name: product?.name ?? "",
      description: product?.description ?? "",
      category: product?.category?.id ?? "",
      discountPercentage: !!product?.discountPercentage
        ? String(product.discountPercentage)
        : "",
      price: !!productBasePrice ? maskCurrency(String(productBasePrice)) : "",
      haveDiscount:
        (!!product?.discountPercentage && product.discountPercentage > 0) ??
        false,
      imageSelecteds: product?.imageUrls ?? [],
    },
  });

  return {
    formMethods,
    productId: product?.id,
  };
};
