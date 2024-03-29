import { formatNumberToCurrency } from "@/helpers/format-number-to-currency";
import { computeProductTotalPrice } from "@/helpers/product";
import { Prisma } from "@prisma/client";
import Image from "next/image";

type Props = {
  orderProduct: Prisma.OrderProductGetPayload<{
    include: {
      product: true;
    };
  }>;
};

export const OrderProductItem = ({ orderProduct }: Props) => {
  const productWithTotalPrice = computeProductTotalPrice(orderProduct.product);
  const totalPriceFormatted = formatNumberToCurrency(
    productWithTotalPrice.totalPrice,
  );
  const basePriceFormatted = formatNumberToCurrency(
    Number(productWithTotalPrice.basePrice),
  );
  const productHaveDiscount = productWithTotalPrice.discountPercentage > 0;
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-[77px] w-[77px] items-center justify-center rounded-lg bg-accent">
        <Image
          src={orderProduct.product.imageUrls[0]}
          alt={orderProduct.product.name}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[80%] w-auto max-w-[80%] object-contain"
        />
      </div>

      <div className="flex w-full flex-col gap-1">
        <div className="flex w-fit rounded-md bg-accent px-3 py-1">
          <p className="text-xxs">
            Vendido e entregue por <span className="font-bold">FSW Store</span>{" "}
          </p>
        </div>

        <p className="text-xs">{orderProduct.product.name}</p>

        <div className="flex w-full items-center justify-between gap-1">
          <div className="flex items-center gap-1">
            <p className="text-sm font-bold">{totalPriceFormatted}</p>

            {productHaveDiscount && (
              <p className="text-xs line-through opacity-60">
                {basePriceFormatted}
              </p>
            )}
          </div>

          <p className="oapcity-60 text-xs">Qntd: {orderProduct.quantity}</p>
        </div>
      </div>
    </div>
  );
};
