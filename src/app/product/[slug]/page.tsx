import { prismaClient } from "@/lib/prisma";
import React from "react";
import ProductImages from "./components/product-images";

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
    <div>
      <ProductImages imageUrls={product.imageUrls} name={product.name} />
    </div>
  );
}
