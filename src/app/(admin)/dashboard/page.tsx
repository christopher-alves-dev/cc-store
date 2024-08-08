import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  CircleDollarSign,
  DollarSign,
  Landmark,
  LayoutList,
  Package,
  ShoppingBasket,
} from "lucide-react";
import { FinancialCard } from "../components/financial-card";
import { MetricCard } from "./components/metric-card";
import { useAuthUser } from "./hooks/useAuthUser";
import { prismaClient } from "@/lib/prisma";
import { computeProductTotalPrice } from "@/helpers/product";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatNumberToCurrency } from "@/helpers/format-number-to-currency";

const MockFinancial = [
  {
    id: 1,
    icon: Landmark,
    title: "Total de Receita",
    value: 9000.0,
  },
  {
    id: 2,
    icon: DollarSign,
    title: "Receita Hoje",
    value: 5000.0,
  },
];

type MostProductsSold = {
  id: string;
  imageUrl: string;
  name: string;
  categoryName: string;
  basePrice: string | number;
  priceWithDiscount: string | number;
  quantity: number;
  discountPercentage: number;
};

export default async function DashboardPage() {
  await useAuthUser();

  const [categories, products, orders] = await Promise.all([
    prismaClient.category.findMany({
      select: {
        id: true,
        name: true,
      },
    }),
    prismaClient.product.findMany({
      select: {
        id: true,
      },
    }),
    prismaClient.order.findMany({
      include: {
        orderProducts: {
          include: {
            product: true,
          },
        },
      },
    }),
  ]);

  let totalProductsSold = 0;
  const mostProductsSold: MostProductsSold[] = [];

  orders.forEach((order) => {
    if (order.status === "PAYMENT_CONFIRMED") {
      order.orderProducts.forEach((orderProduct) => {
        const product = mostProductsSold.find(
          (product) => product.id === orderProduct.product.id,
        );

        if (product) {
          product.quantity += orderProduct.quantity;
        } else {
          mostProductsSold.push({
            id: orderProduct.product.id,
            quantity: orderProduct.quantity,
            basePrice: formatNumberToCurrency(
              Number(orderProduct.product.basePrice),
            ),
            categoryName: categories.find(
              (category) => category.id === orderProduct.product.categoryId,
            )?.name!,
            imageUrl: orderProduct.product.imageUrls[0],
            name: orderProduct.product.name,
            priceWithDiscount: formatNumberToCurrency(
              computeProductTotalPrice(orderProduct.product),
            ),
            discountPercentage: orderProduct.product.discountPercentage,
          });
        }
      });

      totalProductsSold += order.orderProducts.length;
    } else {
      totalProductsSold += 0;
    }
  });

  mostProductsSold.sort((a, b) => b.quantity - a.quantity);

  return (
    <div className="mt-4 flex flex-col gap-6 lg:mt-10 lg:gap-10">
      <Carousel
        data-hide-arrow-md={true}
        data-hide-arrow-lg={true}
        opts={{
          loop: true,
          align: "start",
        }}
        className="group relative px-10"
      >
        <CarouselContent className="lg:-ml-8">
          {MockFinancial.map((financial) => (
            <CarouselItem key={financial.id} className="md:basis-1/2 lg:pl-8">
              <FinancialCard
                icon={financial.icon}
                title={financial.title}
                value={financial.value}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className={
            "absolute left-1 bg-primary md:top-1/2 md:flex md:-translate-y-1/2 md:group-data-[hide-arrow-md=true]:hidden lg:group-data-[hide-arrow-lg=true]:hidden"
          }
        />
        <CarouselNext
          className={
            "absolute right-1 bg-primary md:top-1/2 md:flex md:-translate-y-1/2 md:group-data-[hide-arrow-md=true]:hidden lg:group-data-[hide-arrow-lg=true]:hidden"
          }
        />
      </Carousel>

      <div className="flex flex-col gap-6 px-4 lg:gap-10 lg:px-10">
        <div className="flex flex-wrap gap-6 lg:h-40">
          <MetricCard
            icon={CircleDollarSign}
            label="Total de Produtos Vendidos"
            value={totalProductsSold}
          />
          <MetricCard
            icon={ShoppingBasket}
            label="Total de Pedidos"
            value={orders.length}
          />
          <MetricCard icon={Package} label="Produtos" value={products.length} />
          <MetricCard
            icon={LayoutList}
            label="Categorias"
            value={categories.length}
          />
        </div>
      </div>

      <div className="mx-4 flex flex-col gap-7 rounded-lg border border-solid border-border p-7 lg:mx-10">
        <h4>Produtos Mais Vendidos</h4>

        <div className="flex flex-col gap-7">
          {mostProductsSold.map((product) => {
            const productHaveDiscount = product.discountPercentage > 0;
            return (
              <div
                key={product.id}
                className="flex items-center justify-between"
              >
                <div className="flex gap-5">
                  <div
                    className={
                      "flex h-[100px] items-center justify-center rounded-lg bg-border lg:h-[85px] lg:w-[85px]"
                    }
                  >
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      height={0}
                      width={0}
                      sizes="100vw"
                      className="h-auto max-h-[70%] w-auto max-w-[80%]"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <Badge variant="outlineSecondary" className="w-fit">
                      {product.categoryName}
                    </Badge>
                    <p className="text-base">{product.name}</p>

                    <div className="flex items-center gap-1">
                      <p className="font-semibold lg:text-lg">
                        {product.priceWithDiscount}
                      </p>

                      {productHaveDiscount && (
                        <p className="text-xxs line-through opacity-75 lg:text-xs">
                          {product.basePrice}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-lg font-bold">{product.quantity} vendidos</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
