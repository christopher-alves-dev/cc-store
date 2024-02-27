import { ShapesIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import { CartItem } from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { Separator } from "./separator";
import { formatNumberToCurrency } from "@/helpers/format-number-to-currency";

export const Cart = () => {
  const { products, subtotal, total, totalDiscount } = useContext(CartContext);
  const haveProducts = products.length > 0;
  const subtotalFormatted = formatNumberToCurrency(subtotal);
  const totalFormatted = formatNumberToCurrency(total);
  const totalDiscountFormatted = formatNumberToCurrency(totalDiscount);

  return (
    <div className="flex flex-col gap-8">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-1.5 text-base uppercase"
        variant="outline"
      >
        <ShapesIcon size={16} />
        Carrinho
      </Badge>

      <div className="flex flex-col gap-5">
        {haveProducts ? (
          products?.map((product) => (
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
        </div>
      )}
    </div>
  );
};
