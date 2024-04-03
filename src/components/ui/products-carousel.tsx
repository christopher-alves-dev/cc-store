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
      opts={{
        loop: true,
        align: "start",
      }}
      className="md:relative md:px-10"
    >
      <CarouselContent className="lg:-ml-8">
        {products.map((product) => (
          <CarouselItem
            key={product.id}
            className="basis-1/2 md:basis-1/3 lg:basis-1/5 lg:pl-8"
          >
            <ProductItem product={computeProductTotalPrice(product)} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        data-hide={products.length === 0}
        className={
          "hidden bg-primary md:absolute md:-left-2 md:top-1/2 md:flex md:-translate-y-1/2"
        }
      />
      <CarouselNext
        data-hide={products.length === 0}
        className={
          "hidden bg-primary md:absolute md:-right-2 md:top-1/2 md:flex md:-translate-y-1/2"
        }
      />
    </Carousel>
  );
};
