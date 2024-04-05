import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { computeProductTotalPrice } from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";
import { PackageIcon, PlusIcon } from "lucide-react";
import { ProductsForm } from "./components/products-form";
import {
  ProductWithTotalPriceAndCategory,
  ProductsTable,
} from "./components/products-table";

export default async function ProductsDashboardPage() {
  const categories = await prismaClient.category.findMany({
    select: {
      name: true,
      id: true,
    },
  });

  const products = await prismaClient.product.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
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

      <Sheet>
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-bold">
            Produtos encontrados: {products.length}
          </p>

          <SheetTrigger>
            <Button className="flex gap-2">
              <PlusIcon size={20} />
              Adicionar produto
            </Button>
          </SheetTrigger>
        </div>

        <SheetContent
          side="right"
          className="flex min-w-[400px] flex-col gap-8 px-8 py-10 lg:min-w-[450px]"
        >
          <SheetHeader className="text-left text-lg font-semibold">
            <Badge variant="heading">
              <PackageIcon size={18} />
              Adicionar produto
            </Badge>
          </SheetHeader>

          <ProductsForm categories={categories} />
        </SheetContent>
      </Sheet>

      <ProductsTable products={productsWithTotalPrice} />
    </div>
  );
}
