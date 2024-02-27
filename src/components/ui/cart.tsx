import { ShapesIcon } from "lucide-react";
import { Badge } from "./badge";
import { useContext } from "react";
import { CartContext } from "@/providers/cart";
import { CartItem } from "./cart-item";
import { computeProductTotalPrice } from "@/helpers/product";

export const Cart = () => {
  const { products } = useContext(CartContext);

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
        {products.length ? (
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
    </div>
  );
};
