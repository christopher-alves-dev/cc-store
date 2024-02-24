import { prismaClient } from "@/lib/prisma";
import { Categories } from "./components/categories";
import { ProductList } from "./components/product-list";
import { PromoBanner } from "./components/promo-banner";
import { SectionTitle } from "./components/section-title";

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
      <PromoBanner
        src="https://pub-11426a046d4e420fb71ed0b7100145b5.r2.dev/banners%2Fbanner-home.png"
        alt="Até 55% de desconto só esse mês"
      />

      <Categories className="px-5" />

      <PromoBanner
        src="https://pub-11426a046d4e420fb71ed0b7100145b5.r2.dev/banners%2Fbanner-mouses.png"
        alt="Até 55% de desconto em mouses"
      />

      <div className="flex flex-col gap-4">
        <SectionTitle>Ofertas</SectionTitle>
        <ProductList products={deals} />
      </div>
    </div>
  );
}
