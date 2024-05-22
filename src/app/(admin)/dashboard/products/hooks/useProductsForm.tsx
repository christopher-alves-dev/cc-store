"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductsSchemaType, productsSchema } from "../schema";
import { useProductManager } from "@/stores/product-manager";

export const useProductsForm = () => {
  const { product } = useProductManager();

  const formMethods = useForm<ProductsSchemaType>({
    resolver: zodResolver(productsSchema),
    defaultValues: {
      name: product?.name ?? "",
      description: product?.description ?? "",
      category: product?.category?.id ?? "",
      discountPercentage: !!product?.discountPercentage
        ? String(product.discountPercentage)
        : "",
      price: !!product?.basePrice ? String(product?.basePrice) : "",
      haveDiscount:
        (!!product?.discountPercentage && product.discountPercentage > 0) ??
        false,
      imageSelecteds: [],
    },
  });

  return {
    formMethods,
  };
};
