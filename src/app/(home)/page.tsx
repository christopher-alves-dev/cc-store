import Image from "next/image";
import { Categories } from "./components/categories";
import { ProductList } from "./components/product-list";
import { prismaClient } from "@/lib/prisma";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });
  return (
    <div>
      <div className="p-5 pb-0">
        <Image
          src="/banner-home.png"
          alt="Até 55% de desconto só esse mês"
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto w-full"
        />

        <div className="mt-8">
          <Categories />
        </div>
      </div>

      <div className="mt-8">
        <ProductList products={deals} />
      </div>
    </div>
  );
}
