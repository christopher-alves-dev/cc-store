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
    <div className="flex w-full flex-col gap-4 p-4 sm:gap-10 md:p-10">
      <div className="flex w-full flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="order-2 text-lg font-bold sm:order-1">
          Categorias encontrados: {categories.length}
        </p>

        <CategorySheet className="order-1 sm:order-2" />
      </div>

      <CategoriesTable categories={categories} />
    </div>
  );
}
