import { computeProductTotalPrice } from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";
import { ProductWithTotalPriceAndCategory } from "@/types/product";
import { useAuthUser } from "../hooks/useAuthUser";
import { ProductSheet } from "./components/product-sheet";
import { ProductsTable } from "./components/products-table";

export default async function ProductsDashboardPage() {
  await useAuthUser();

  const categories = await prismaClient.category.findMany({
    select: {
      name: true,
      id: true,
    },
  });

  const products = await prismaClient.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      name: "desc",
    },
  });

  const productsWithTotalPrice: ProductWithTotalPriceAndCategory[] =
    products.map((product) => ({
      ...product,
      totalPrice: computeProductTotalPrice(product),
    }));

  return (
    <div className="flex w-full flex-col gap-4 p-10 sm:gap-10">
      <div className="flex w-full flex-col gap-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="order-2 text-lg font-bold sm:order-1">
          Produtos encontrados: {products.length}
        </p>

        <ProductSheet categories={categories} className="order-1 sm:order-2" />
      </div>

      <ProductsTable products={productsWithTotalPrice} />
    </div>
  );
}
