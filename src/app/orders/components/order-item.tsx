import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import { OrderProductItem } from "./order-product-item";
import { Separator } from "@/components/ui/separator";
import { updateSummary } from "@/stores/helpers/summary-utils";
import { computeProductTotalPrice } from "@/helpers/product";
import { formatNumberToCurrency } from "@/helpers/format-number-to-currency";
import { getOrderStatus } from "../helpers/get-order-status";

type Props = {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: {
        include: {
          product: true;
        };
      };
    };
  }>;
};

export const OrderItem = ({ order }: Props) => {
  const productsLength = order.orderProducts.length;
  const productQuantity = `Pedido com ${productsLength > 1 ? `${productsLength} produtos` : `${productsLength} produto`}`;
  const dateFormatted = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
  }).format(order.createdAt);

  const orderDate = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(order.createdAt);

  const productValues = order.orderProducts.map((orderProduct) => {
    const formattedPrice = computeProductTotalPrice(orderProduct.product);
    return {
      basePrice: orderProduct.basePrice,
      quantity: orderProduct.quantity,
      totalPrice: formattedPrice.totalPrice,
    };
  });

  const summary = updateSummary(productValues);

  const subtotal = formatNumberToCurrency(summary.subtotal);
  const totalDiscount = formatNumberToCurrency(summary.totalDiscount);
  const totalPrice = formatNumberToCurrency(summary.total);

  return (
    <Card className="px-5">
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value={order.id}>
          <AccordionTrigger>
            <div className="flex flex-col gap-1 text-left">
              <p className="text-sm font-bold uppercase">{productQuantity}</p>
              <span className="text-xs opacity-60">Feito em {orderDate}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="font-bold">
                  <p>Status</p>
                  <p className="text-[#8162FF]">
                    {getOrderStatus(order.status)}
                  </p>
                </div>

                <div>
                  <p className="font-bold">Data</p>
                  <p className="opacity-60">{dateFormatted}</p>
                </div>

                <div>
                  <p className="font-bold">Pagamento</p>
                  <p className="opacity-60">Cartão</p>
                </div>
              </div>

              {order.orderProducts.map((orderProduct) => (
                <OrderProductItem
                  key={orderProduct.id}
                  orderProduct={orderProduct}
                />
              ))}

              <div className="flex w-full flex-col gap-1 text-xs">
                <Separator />

                <div className="flex w-full justify-between py-3">
                  <p>Subtotal</p>
                  <p>{subtotal}</p>
                </div>

                <Separator />

                <div className="flex w-full justify-between py-3">
                  <p>Entrega</p>
                  <p>Grátis</p>
                </div>

                <Separator />

                <div className="flex w-full justify-between py-3">
                  <p>Descontos</p>
                  <p>{totalDiscount}</p>
                </div>

                <Separator />

                <div className="flex w-full justify-between py-3 text-sm font-bold">
                  <p>Total</p>
                  <p>{totalPrice}</p>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
