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
  const totalPriceFormatted = formatNumberToCurrency(productWithTotalPrice);
  const basePriceFormatted = formatNumberToCurrency(
    Number(productWithTotalPrice),
  );
  const productHaveDiscount = productWithTotalPrice > 0;
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-[77px] w-[100px] items-center justify-center rounded-lg bg-accent lg:h-[91px]">
        <Image
          src={orderProduct.product.imageUrls[0]}
          alt={orderProduct.product.name}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[80%] w-auto max-w-[80%] object-contain"
        />
      </div>

      <div className="flex w-full flex-col gap-1 lg:gap-4">
        <div className="flex w-fit rounded-md bg-accent px-3 py-1">
          <p className="text-xxs lg:text-xs">
            Vendido e entregue por <span className="font-bold">FSW Store</span>{" "}
          </p>
        </div>

        <p className="text-xs lg:text-sm">{orderProduct.product.name}</p>

        <p className="hidden text-xs opacity-60 lg:block">
          Quantidade: {orderProduct.quantity}
        </p>

        <div className="flex w-full items-center justify-between gap-1 lg:hidden">
          <div className="flex items-center gap-1">
            <p className="text-sm font-bold lg:text-xl">
              {totalPriceFormatted}
            </p>

            {productHaveDiscount && (
              <p className="text-xs line-through opacity-60">
                {basePriceFormatted}
              </p>
            )}
          </div>

          <p className="text-xs opacity-60 lg:hidden">
            Qntd: {orderProduct.quantity}
          </p>
        </div>
      </div>

      <div className="hidden flex-col items-end gap-1 lg:flex">
        <p className="text-sm font-bold lg:text-xl">{totalPriceFormatted}</p>

        {productHaveDiscount && (
          <p className="text-xs line-through opacity-60">
            {basePriceFormatted}
          </p>
        )}
      </div>
    </div>
  );
};
