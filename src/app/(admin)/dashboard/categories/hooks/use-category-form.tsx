"use client";

import { useCategoryManager } from "@/stores/category-manager";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CategorySchemaType, categorySchema } from "../schema";

export const useCategoryForm = () => {
  const category = useCategoryManager((state) => state.category);

  const formMethods = useForm<CategorySchemaType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name ?? "",
      image: category?.imageUrl ?? "",
    },
  });

  return {
    formMethods,
    categoryId: category?.id,
  };
};
