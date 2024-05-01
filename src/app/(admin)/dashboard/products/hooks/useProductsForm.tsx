"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductsSchemaType, productsSchema } from "../schema";

export const useProductsForm = () => {
  const formMethods = useForm<ProductsSchemaType>({
    resolver: zodResolver(productsSchema),
    defaultValues: {
      name: "",
      category: "",
      discountPercentage: 0,
      price: "",
      haveDiscount: false,
    },
  });

  return {
    formMethods,
  };
};
