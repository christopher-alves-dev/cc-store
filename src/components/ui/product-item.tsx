import { formatNumberToCurrency } from "@/helpers/format-number-to-currency";
import { ProductWithTotalPrice } from "@/helpers/product";
import Image from "next/image";
import Link from "next/link";
import { DiscountBadge } from "./discount-badge";

type Props = {
  product: ProductWithTotalPrice;
};
export const ProductItem = ({ product }: Props) => {
  const [firstProductImage] = product.imageUrls;
  const totalPrice = formatNumberToCurrency(product.totalPrice);
  const basePrice = formatNumberToCurrency(Number(product.basePrice));

  return (
    <Link href={`/product/${product.slug}`}>
      <div className="flex flex-col gap-4">
        <div className="relative flex h-[170px] w-[180px] items-center justify-center rounded-lg bg-accent">
          <Image
            src={firstProductImage}
            alt={product.name}
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
          />

          {product.discountPercentage > 0 && (
            <DiscountBadge className="absolute left-3 top-3">
              {product.discountPercentage}
            </DiscountBadge>
          )}
        </div>

        <div className="flex flex-col gap-1 lg:gap-1.5">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {product.name}
          </p>

          <div className="flex items-center gap-2">
            {product.discountPercentage > 0 ? (
              <>
                <p className="font-semibold lg:text-lg">{totalPrice}</p>
                <p className="text-xxs line-through opacity-75 lg:text-sm">
                  {basePrice}
                </p>
              </>
            ) : (
              <p className="font-semibold">{totalPrice}</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
