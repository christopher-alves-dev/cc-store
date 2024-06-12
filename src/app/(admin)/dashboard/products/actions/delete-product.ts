"use server";

import { prismaClient } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteProduct = async (productId: string) => {
  try {
    await prismaClient.product.delete({
      where: {
        id: productId,
      },
    });
  } catch (error) {
    return {
      error: {
        message: "Erro ao deletar o produto",
      },
    };
  }
  revalidatePath("dashboard/products");
};
