"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProductsSchemaType, productsSchema } from "../schema";

export const useProductsForm = () => {
  const formMethods = useForm<ProductsSchemaType>({
    // resolver: zodResolver(productsSchema),
    defaultValues: {
      // category: "",
      // discountPercentage: 0,
      name: "",
      // price: "",
      // productHaveDiscount: false,
    },
  });

  return {
    formMethods,
  };
};
