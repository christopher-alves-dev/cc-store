import { prismaClient } from "@/lib/prisma";
import { useAuthUser } from "../hooks/useAuthUser";
import { CategoriesTable } from "./components/categories-table";
import { CategorySheet } from "./components/category-sheet";

export default async function DashboardCategoriesPage() {
  await useAuthUser();

  const categories = await prismaClient.category.findMany({
    include: {
      products: {
        select: {
          id: true,
        },
      },
    },
  });

  return (
    <div className="flex w-full flex-col gap-10 p-10">
      <div className="flex w-full items-center justify-between">
        <p className="text-lg font-bold">
          Categorias encontrados: {categories.length}
        </p>

        <CategorySheet />
      </div>

      <CategoriesTable categories={categories} />
    </div>
  );
}
