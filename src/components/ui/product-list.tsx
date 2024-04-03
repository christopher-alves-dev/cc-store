import { ProductItem } from "@/components/ui/product-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { Product } from "@prisma/client";

type Props = {
  products: Product[];
};
export const ProductList = ({ products }: Props) => {
  return (
    <div className="flex w-full gap-4 overflow-x-auto lg:gap-8 [&::-webkit-scrollbar]:hidden">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={computeProductTotalPrice(product)}
          className="w-[180px]"
        />
      ))}
    </div>
  );
};
