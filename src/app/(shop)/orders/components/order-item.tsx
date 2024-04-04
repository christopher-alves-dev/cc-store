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
import { Summary } from "@/components/ui/summary";
import { OrderAccordionTrigger } from "./order-accordion-trigger";
import { OrderAccordionTriggerDesktop } from "./order-accordion-trigger-desktop";

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
  const orderDate = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
  }).format(order?.createdAt);

  const productValues = order?.orderProducts.map((orderProduct) => {
    const formattedPrice = computeProductTotalPrice(orderProduct.product);
    return {
      basePrice: orderProduct.basePrice,
      quantity: orderProduct.quantity,
      totalPrice: formattedPrice,
    };
  });

  const summary = updateSummary(productValues);

  const subtotal = formatNumberToCurrency(summary.subtotal);
  const totalDiscount = formatNumberToCurrency(summary.totalDiscount);
  const totalPrice = formatNumberToCurrency(summary.total);

  return (
    <Card className="border-2 px-5">
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value={order?.id}>
          <AccordionTrigger>
            <OrderAccordionTrigger code={order?.code} />

            <OrderAccordionTriggerDesktop
              data={{
                code: order?.code,
                orderDate,
                paymentType: "Cartão de Crédito",
                status: getOrderStatus(order?.status),
              }}
            />
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-4 lg:gap-8">
              <div className="flex items-center justify-between lg:hidden">
                <div className="font-bold">
                  <p className="text-xs lg:text-sm">Status</p>
                  <p className="text-xs text-[#8162FF] lg:text-sm">
                    {getOrderStatus(order?.status)}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold lg:text-sm">Data</p>
                  <p className="opacity-60">{orderDate}</p>
                </div>

                <div>
                  <p className="text-xs font-bold lg:text-sm">Pagamento</p>
                  <p className="opacity-60">Cartão</p>
                </div>
              </div>

              <Separator className="hidden h-0.5 lg:block" />

              {order?.orderProducts.map((orderProduct) => (
                <OrderProductItem
                  key={orderProduct.id}
                  orderProduct={orderProduct}
                />
              ))}
              <div className="flex w-full flex-col gap-3 text-xs">
                <Separator className="h-0.5" />

                <Summary label="subtotal" value={subtotal} />

                <Separator className="h-0.5" />

                <Summary label="Entrega" value="grátis" />

                <Separator className="h-0.5" />

                <Summary label="Descontos" value={totalDiscount} />

                <Separator className="h-0.5" />

                <Summary
                  label="Total"
                  className="text-sm font-bold lg:text-base"
                  value={totalPrice}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
