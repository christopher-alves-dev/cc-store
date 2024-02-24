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
    <div className="flex flex-col gap-8">
      <Image
        src="https://pub-11426a046d4e420fb71ed0b7100145b5.r2.dev/banners%2Fbanner-home.png"
        alt="Até 55% de desconto só esse mês"
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto w-full px-5"
      />

      <Categories className="px-5" />

      <Image
        src="https://pub-11426a046d4e420fb71ed0b7100145b5.r2.dev/banners%2Fbanner-mouses.png"
        alt="Até 55% de desconto em mouses"
        width={0}
        height={0}
        sizes="100vw"
        className="h-auto w-full px-5"
      />

      <div className="flex flex-col gap-4">
        <p className="pl-5 font-bold uppercase">Ofertas</p>
        <ProductList products={deals} />
      </div>
    </div>
  );
}
