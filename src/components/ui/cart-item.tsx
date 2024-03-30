import { formatNumberToCurrency } from "@/helpers/format-number-to-currency";
import { CartProduct, useCartStore } from "@/stores/cart";
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
        <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-accent lg:h-24 lg:w-24">
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
            <p className="text-xs lg:text-sm">{product.name}</p>

            <div className="flex items-center gap-2">
              <p className="text-sm font-bold lg:text-base">{totalPrice}</p>
              {haveDiscount && (
                <p className="text-xs line-through opacity-75">{basePrice}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 lg:gap-3">
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 text-base lg:text-xl"
              disabled={product.quantity === 1}
              onClick={handleDecreaseQuantity}
            >
              <ArrowLeftIcon className="h-[1em] w-[1em]" />
            </Button>

            <span className="text-xs lg:text-base">{product.quantity}</span>

            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 text-base lg:text-xl"
              onClick={handleIncreaseQuantity}
            >
              <ArrowRightIcon className="h-[1em] w-[1em]" />
            </Button>
          </div>
        </div>
      </div>

      <Button
        size="icon"
        variant="outline"
        className="text-base lg:text-xl"
        onClick={handleRemoveProductFromCart}
      >
        <TrashIcon className="h-[1em] w-[1em]" />
      </Button>
    </div>
  );
};
