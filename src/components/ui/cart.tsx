import { createCheckout } from "@/actions/checkout";
import { formatNumberToCurrency } from "@/helpers/format-number-to-currency";
import { computeProductTotalPrice } from "@/helpers/product";
import { CartState, useCartStore } from "@/stores/cart";
import { loadStripe } from "@stripe/stripe-js";
import { ShapesIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Badge } from "./badge";
import { Button } from "./button";
import { CartItem } from "./cart-item";
import { Separator } from "./separator";

export const Cart = () => {
  const [products, summary] = useCartStore((state) => [
    state.products,
    state.summary,
  ]);
  const haveProducts = products.length ?? 0 > 0;
  const subtotalFormatted = formatNumberToCurrency(summary.subtotal ?? 0);
  const totalFormatted = formatNumberToCurrency(summary?.total ?? 0);
  const totalDiscountFormatted = formatNumberToCurrency(
    summary?.totalDiscount ?? 0,
  );

  const handleFinishPurchaseClick = async () => {
    const checkout = await createCheckout(products);

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    });
  };

  return (
    <div className="flex h-full flex-col gap-8">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-1.5 text-base uppercase"
        variant="outline"
      >
        <ShapesIcon size={16} />
        Carrinho
      </Badge>

      <div className="flex flex-grow flex-col gap-5 overflow-y-scroll">
        {haveProducts ? (
          products.map((product) => (
            <CartItem
              key={product.id}
              product={computeProductTotalPrice(product) as any}
            />
          ))
        ) : (
          <p className="text-center font-semibold">Carrinho sem produtos</p>
        )}
      </div>

      {haveProducts && (
        <div className="flex flex-col gap-2.5">
          <Separator />

          <div className="flex items-center justify-between text-xs">
            <p className="capitalize">subtotal</p>
            <p>{subtotalFormatted}</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-xs">
            <p className="capitalize">entrega</p>
            <p className="uppercase">grátis</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-xs">
            <p className="capitalize">descontos</p>
            <p className="uppercase">- {totalDiscountFormatted}</p>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-sm font-bold">
            <p className="capitalize">Total</p>
            <p className="uppercase">{totalFormatted}</p>
          </div>

          <Button className="mt-7" onClick={handleFinishPurchaseClick}>
            Finalizar compra
          </Button>
        </div>
      )}
    </div>
  );
};
