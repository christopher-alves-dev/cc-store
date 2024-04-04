import { ProductItem } from "@/components/ui/product-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { Product } from "@prisma/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";

type Props = {
  products: Product[];
};

export const ProductsCarousel = ({ products }: Props) => {
  return (
    <Carousel
      data-hide-arrow-md={products.length <= 3}
      data-hide-arrow-lg={products.length <= 5}
      opts={{
        loop: true,
        align: "start",
      }}
      className="group md:relative md:px-10"
    >
      <CarouselContent className="lg:-ml-8">
        {products.map((product) => (
          <CarouselItem
            key={product.id}
            className="basis-1/2 md:basis-1/3 lg:basis-1/5 lg:pl-8"
          >
            <ProductItem
              product={{
                ...product,
                totalPrice: computeProductTotalPrice(product),
              }}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        className={
          "hidden bg-primary md:absolute md:-left-2 md:top-1/2 md:flex md:-translate-y-1/2 md:group-data-[hide-arrow-md=true]:hidden lg:group-data-[hide-arrow-lg=true]:hidden"
        }
      />
      <CarouselNext
        className={
          "hidden bg-primary md:absolute md:-right-2 md:top-1/2 md:flex md:-translate-y-1/2 md:group-data-[hide-arrow-md=true]:hidden lg:group-data-[hide-arrow-lg=true]:hidden"
        }
      />
    </Carousel>
  );
};
