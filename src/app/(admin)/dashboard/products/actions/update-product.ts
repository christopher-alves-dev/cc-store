"use server";

import { normalize } from "@/helpers/normalize";
import { prismaClient } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { ProductsSchemaType } from "../schema";

type UpdateProductParams = ProductsSchemaType & {
  id: string;
};

export const updateProduct = async (form: UpdateProductParams) => {
  try {
    const productSlug = normalize(form.name as string);

    const category = await prismaClient.category.findUnique({
      where: { id: form.category as string },
    });

    if (!category) {
      return {
        error: {
          message: "Category not found",
        },
      };
    }

    await prismaClient.product.update({
      where: {
        id: form.id,
      },
      data: {
        categoryId: category.id,
        name: form.name,
        description: form.description,
        slug: productSlug,
        basePrice: parseFloat(
          (form.price as string).replaceAll(".", "").replace(",", "."),
        ),
        discountPercentage: Number(form.discountPercentage) ?? 0,
        imageUrls: form.imageSelecteds,
      },
    });

    revalidatePath("dashboard/products");

    return {
      success: {
        message: "Update with success",
      },
    };
  } catch (error) {
    return {
      error: {
        message: "Error updating product",
      },
    };
  }
};
