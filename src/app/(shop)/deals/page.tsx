import { Badge } from "@/components/ui/badge";
import { ProductItem } from "@/components/ui/product-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";
import { PercentIcon } from "lucide-react";

export default async function DealsPage() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });
  return (
    <div className="mt-10 flex flex-col gap-8 px-5">
      <Badge variant="heading">
        <PercentIcon size={16} />
        Ofertas
      </Badge>

      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:gap-10 xl:grid-cols-4">
        {deals.map((product) => (
          <ProductItem
            key={product.id}
            product={{
              ...product,
              totalPrice: computeProductTotalPrice(product),
            }}
          />
        ))}
      </div>
    </div>
  );
}
