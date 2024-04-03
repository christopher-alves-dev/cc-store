import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { prismaClient } from "@/lib/prisma";
import { PackageIcon, PlusIcon } from "lucide-react";
import { ProductsTable } from "./components/products-table";
import { computeProductTotalPrice } from "@/helpers/product";

export default async function ProductsDashboardPage() {
  const products = await prismaClient.product.findMany();

  const productsWithTotalPrice = products.map((product) =>
    computeProductTotalPrice(product),
  );

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

        <Button className="flex gap-2">
          <PlusIcon size={16} />
          Adicionar produto
        </Button>
      </div>

      <ProductsTable products={productsWithTotalPrice} />
    </div>
  );
}
