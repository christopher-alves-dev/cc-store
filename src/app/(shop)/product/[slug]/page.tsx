import { prismaClient } from "@/lib/prisma";
import React from "react";
import ProductImages from "./components/product-images";
import { ProductInfo } from "./components/product-info";
import { computeProductTotalPrice } from "@/helpers/product";
import { ProductList } from "@/components/ui/product-list";
import { SectionTitle } from "@/components/ui/section-title";
import { ProductsCarousel } from "@/components/ui/products-carousel";

type Props = {
  params: {
    slug: string;
  };
};

export default async function ProductPage({ params }: Props) {
  const { slug } = params;
  const product = await prismaClient.product.findFirst({
    where: {
      slug: slug,
    },
    include: {
      category: {
        include: {
          products: {
            where: {
              slug: {
                not: slug,
              },
            },
          },
        },
      },
    },
  });

  if (!product) {
    return null;
  }

  const productStringify = JSON.parse(JSON.stringify(product));

  return (
    <div className="mt-10 flex flex-col gap-8 pb-8 lg:gap-0 lg:pb-10">
      <div className="flex flex-col gap-8 lg:flex-row lg:pb-10">
        <ProductImages
          imageUrls={productStringify.imageUrls}
          name={productStringify.name}
        />
        <ProductInfo
          product={{
            ...productStringify,
            totalPrice: computeProductTotalPrice(productStringify),
          }}
        />
      </div>

      <div className="flex flex-col gap-5 px-5 lg:pt-10 2xl:px-0">
        <SectionTitle className="lg:text-lg">
          produtos recomendados
        </SectionTitle>
        <ProductsCarousel products={productStringify.category.products} />
      </div>
    </div>
  );
}
