import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { computeProductTotalPrice } from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";
import { PackageIcon, PlusIcon } from "lucide-react";
import { ProductSheet } from "./components/product-sheet";
import { ProductsTable } from "./components/products-table";
import { ProductWithTotalPriceAndCategory } from "@/types/product";

export default async function ProductsDashboardPage() {
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
    <div className="flex w-full flex-col gap-10 p-10">
      <Badge variant="heading">
        <PackageIcon size={18} />
        Produtos
      </Badge>

      <div className="flex w-full items-center justify-between">
        <p className="text-lg font-bold">
          Produtos encontrados: {products.length}
        </p>

        <ProductSheet categories={categories} />
      </div>

      <ProductsTable products={productsWithTotalPrice} />
    </div>
  );
}
