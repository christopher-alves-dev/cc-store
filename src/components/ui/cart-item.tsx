import { formatNumberToCurrency } from "@/helpers/format-number-to-currency";
import { CartProduct } from "@/providers/cart";
import { useCartStore } from "@/stores/cart";
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./button";

type Props = {
  product: CartProduct;
};

export const CartItem = ({ product }: Props) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductFromCart,
  } = useCartStore();

  const totalPrice = formatNumberToCurrency(product.totalPrice);
  const basePrice = formatNumberToCurrency(Number(product.basePrice));
  const haveDiscount = product.discountPercentage > 0;

  const handleDecreaseQuantity = () => {
    decreaseProductQuantity(product);
  };

  const handleIncreaseQuantity = () => {
    increaseProductQuantity(product);
  };

  const handleRemoveProductFromCart = () => {
    removeProductFromCart(product.id);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-accent">
          <Image
            src={product.imageUrls[0]}
            width={0}
            height={0}
            sizes="100vw"
            alt={product.name}
            className="h-auto max-h-[70%] w-auto max-w-[80%]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div>
            <p className="text-xs">{product.name}</p>

            <div className="flex items-center gap-2">
              <p className="text-sm font-bold">{totalPrice}</p>
              {haveDiscount && (
                <p className="text-xs line-through opacity-75">{basePrice}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              disabled={product.quantity === 1}
              onClick={handleDecreaseQuantity}
            >
              <ArrowLeftIcon size={16} />
            </Button>

            <span className="text-xs">{product.quantity}</span>

            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8"
              onClick={handleIncreaseQuantity}
            >
              <ArrowRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>

      <Button
        size="icon"
        variant="outline"
        onClick={handleRemoveProductFromCart}
      >
        <TrashIcon size={16} />
      </Button>
    </div>
  );
};
