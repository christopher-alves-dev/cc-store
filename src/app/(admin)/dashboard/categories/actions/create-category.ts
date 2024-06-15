"use server";

import { normalize } from "@/helpers/normalize";
import { prismaClient } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { CategorySchemaType } from "../schema";

export const createCategory = async (form: CategorySchemaType) => {
  try {
    const slug = normalize(form.name as string);

    await prismaClient.category.create({
      data: {
        name: form.name,
        slug,
        imageUrl: form.image,
      },
    });

    revalidatePath("dashboard/categories");

    return {
      success: {
        message: "Categoria criada com sucesso",
      },
    };
  } catch (error) {
    return {
      error: {
        message: "Erro ao criar categoria",
      },
    };
  }
};
