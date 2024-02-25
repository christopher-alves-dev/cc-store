import { prismaClient } from "@/lib/prisma";
import React from "react";
import ProductImages from "./components/product-images";
import { ProductInfo } from "./components/product-info";
import { computeProductTotalPrice } from "@/helpers/product";

type Props = {
  params: {
    slug: string;
  };
};

export default async function ProductPage({ params }: Props) {
  const product = await prismaClient.product.findFirst({
    where: {
      slug: params.slug,
    },
  });

  if (!product) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8">
      <ProductImages imageUrls={product.imageUrls} name={product.name} />
      <ProductInfo product={computeProductTotalPrice(product)} />
    </div>
  );
}
