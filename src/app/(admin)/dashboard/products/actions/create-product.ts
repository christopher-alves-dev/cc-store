"use server";

import { uploadFile } from "@/actions/upload-file";
import { normalize } from "@/helpers/normalize";
import { prismaClient } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createProduct = async (form: FormData) => {
  try {
    const images = form.getAll("imageSelecteds") as File[];

    const rawFormData = Object.fromEntries(form.entries());
    const uploadUrlsArray: string[] = [];

    const productSlug = normalize(rawFormData.name as string);
    for (const image of images) {
      const result = await uploadFile(image);

      if (result) {
        uploadUrlsArray.push(result);
      }
    }

    const category = await prismaClient.category.findUnique({
      where: { id: rawFormData.category as string },
    });

    if (!category) {
      return {
        error: {
          message: "Category not found",
        },
      };
    }

    await prismaClient.product.create({
      data: {
        categoryId: category.id,
        name: String(rawFormData.name),
        description: String(rawFormData.description),
        slug: productSlug,
        basePrice: parseFloat(
          (rawFormData.price as string).replaceAll(".", "").replace(",", "."),
        ),
        discountPercentage: Number(rawFormData.discountPercentage) ?? 0,
        imageUrls: uploadUrlsArray,
      },
    });
  } catch (error) {
    return {
      error: {
        message: "Error creating product",
      },
    };
  }

  revalidatePath("dashboard/products");
};
