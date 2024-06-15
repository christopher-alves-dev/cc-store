"use server";

import { normalize } from "@/helpers/normalize";
import { prismaClient } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { CategorySchemaType } from "../schema";

type UpdateCategoryParams = CategorySchemaType & {
  id: string;
};

export const updateCategory = async (form: UpdateCategoryParams) => {
  try {
    const slug = normalize(form.name as string);

    await prismaClient.category.update({
      where: {
        id: form.id,
      },
      data: {
        name: form.name,
        slug,
        imageUrl: form.image,
      },
    });

    revalidatePath("dashboard/categories");

    return {
      success: {
        message: "Categoria atualizada com sucesso",
      },
    };
  } catch (error) {
    return {
      error: {
        message: "Erro ao atualizar categoria",
      },
    };
  }
};
