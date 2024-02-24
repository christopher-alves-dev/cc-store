import { ProductWithTotalPrice } from "@/helpers/product";
import Image from "next/image";
import { Badge } from "./badge";
import { ArrowDownIcon } from "lucide-react";
import { formatNumberToCurrency } from "@/helpers/format-number-to-currency";

type Props = {
  product: ProductWithTotalPrice;
};
export const ProductItem = ({ product }: Props) => {
  const [firstProductImage] = product.imageUrls;
  const totalPrice = formatNumberToCurrency(product.totalPrice);
  const basePrice = formatNumberToCurrency(Number(product.basePrice));

  return (
    <div className="flex max-w-[170px] flex-col  gap-4">
      <div className="relative flex h-[170px] w-[170px] items-center justify-center rounded-lg bg-accent">
        <Image
          src={firstProductImage}
          alt={product.name}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%]"
        />

        {product.discountPercentage > 0 && (
          <Badge className="absolute left-3 top-3 px-2 py-0.5">
            <ArrowDownIcon size={14} /> {product.discountPercentage} %
          </Badge>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
          {product.name}
        </p>

        <div className="flex items-center gap-2">
          {product.discountPercentage > 0 ? (
            <>
              <p className="font-semibold">{totalPrice}</p>
              <p className="text-xxs line-through opacity-75">{basePrice}</p>
            </>
          ) : (
            <p className="font-semibold">{totalPrice}</p>
          )}
        </div>
      </div>
    </div>
  );
};
