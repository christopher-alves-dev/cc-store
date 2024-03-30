import { prismaClient } from "@/lib/prisma";
import { Categories } from "./components/categories";
import { ProductList } from "@/components/ui/product-list";
import { PromoBanner } from "./components/promo-banner";
import { SectionTitle } from "@/components/ui/section-title";

export default async function Home() {
  const deals = await prismaClient.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
  });

  const keyboards = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "keyboards",
      },
    },
  });

  const mouses = await prismaClient.product.findMany({
    where: {
      category: {
        slug: "mouses",
      },
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <PromoBanner
        src="https://pub-11426a046d4e420fb71ed0b7100145b5.r2.dev/banners%2Fbanner-home.png"
        className="px-5 lg:hidden"
        alt="Até 55% de desconto só esse mês"
      />

      <PromoBanner
        src="https://pub-11426a046d4e420fb71ed0b7100145b5.r2.dev/banners%2Fbanner-deals-desktop.png"
        className="hidden lg:block"
        alt="Até 55% de desconto só esse mês"
      />

      <div className="flex flex-col gap-8 px-5 xl:container">
        <Categories />

        <div className="flex flex-col gap-4 lg:gap-5">
          <SectionTitle>Ofertas</SectionTitle>
          <ProductList products={deals} />
        </div>

        <div className="flex gap-9">
          <PromoBanner
            src="https://pub-11426a046d4e420fb71ed0b7100145b5.r2.dev/banners%2Fbanner-mouses.png"
            alt="Até 55% de desconto em mouses"
          />

          <PromoBanner
            src="https://pub-11426a046d4e420fb71ed0b7100145b5.r2.dev/banners%2Fbanner-fones.png"
            alt="Até 20% de desconto em fones"
            className="hidden lg:block"
          />
        </div>

        <div className="flex flex-col gap-4">
          <SectionTitle>Teclados</SectionTitle>
          <ProductList products={keyboards} />
        </div>

        <PromoBanner
          src="https://pub-11426a046d4e420fb71ed0b7100145b5.r2.dev/banners%2Fbanner-fones.png"
          alt="Até 20% de desconto em fones"
          className="lg:hidden"
        />

        <PromoBanner
          src="https://pub-11426a046d4e420fb71ed0b7100145b5.r2.dev/banners%2Fbanner-freight.png"
          alt="Até 20% de desconto em fones"
          className="hidden lg:block"
        />

        <div className="flex flex-col gap-4">
          <SectionTitle>Mouses</SectionTitle>
          <ProductList products={mouses} />
        </div>
      </div>
    </div>
  );
}
