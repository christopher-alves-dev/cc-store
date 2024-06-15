"use server";

import { prismaClient } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteCategory = async (categoryId: string) => {
  try {
    await prismaClient.category.delete({
      where: {
        id: categoryId,
      },
    });

    revalidatePath("dashboard/categories");
    return {
      success: {
        message: "Categoria deletada com sucesso",
      },
    };
  } catch (error) {
    return {
      error: {
        message: "Erro ao deletar a categoria",
      },
    };
  }
};
