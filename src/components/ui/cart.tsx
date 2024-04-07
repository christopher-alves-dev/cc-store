import { createCheckout } from "@/actions/checkout";
import { createOrder } from "@/actions/order";
import { formatNumberToCurrency } from "@/helpers/format-number-to-currency";
import { computeProductTotalPrice } from "@/helpers/product";
import { useCartStore } from "@/stores/cart";
import { loadStripe } from "@stripe/stripe-js";
import { ShapesIcon } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { Badge } from "./badge";
import { Button } from "./button";
import { CartItem } from "./cart-item";
import { Separator } from "./separator";
import { Summary } from "./summary";
import { useToast } from "./use-toast";
import { ToastAction } from "./toast";

export const Cart = () => {
  const { data } = useSession();
  const { toast } = useToast();
  const [products, summary] = useCartStore((state) => [
    state.products,
    state.summary,
  ]);
  const haveProducts = products.length > 0;
  const subtotalFormatted = formatNumberToCurrency(summary.subtotal ?? 0);
  const totalFormatted = formatNumberToCurrency(summary?.total ?? 0);
  const totalDiscountFormatted = formatNumberToCurrency(
    summary?.totalDiscount ?? 0,
  );

  const handleLoginClick = async () => {
    await signIn();
  };

  const handleFinishPurchaseClick = async () => {
    if (!data?.user) {
      toast({
        title: "Ação necessária",
        description: "Faça login para finalizar sua compra.",
        action: (
          <ToastAction altText="Fazer Login" onClick={handleLoginClick}>
            Fazer Login
          </ToastAction>
        ),
      });
      return;
    }

    const order = await createOrder(products, data.user.id);

    const checkout = await createCheckout(products, order.id);

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
    stripe?.redirectToCheckout({
      sessionId: checkout.id,
    });
  };

  return (
    <div className="flex h-full flex-col gap-8">
      <Badge variant="heading">
        <ShapesIcon size={16} />
        Carrinho
      </Badge>

      <div className="flex flex-grow flex-col gap-5 overflow-y-scroll">
        {haveProducts ? (
          products.map((product) => (
            <CartItem
              key={product.id}
              product={{
                ...product,
                totalPrice: computeProductTotalPrice(product),
              }}
            />
          ))
        ) : (
          <p className="text-center font-semibold">Carrinho sem produtos</p>
        )}
      </div>

      {haveProducts && (
        <div className="flex flex-col gap-2.5">
          <Separator />

          <Summary label="subtotal" value={subtotalFormatted} />

          <Separator />

          <Summary label="entrega" value="grátis" />

          <Separator />

          <Summary label="descontos" value={totalDiscountFormatted} />

          <Separator />

          <Summary label="Total" className="font-bold" value={totalFormatted} />

          <Button className="mt-7" onClick={handleFinishPurchaseClick}>
            Finalizar compra
          </Button>
        </div>
      )}
    </div>
  );
};
