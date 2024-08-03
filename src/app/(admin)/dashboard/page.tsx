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

export default async function DashboardPage() {
  await useAuthUser();

  const [categories, products, orders] = await Promise.all([
    prismaClient.category.findMany({
      select: {
        id: true,
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
  orders.forEach(
    (order) =>
      (totalProductsSold +=
        order.status === "PAYMENT_CONFIRMED" ? order.orderProducts.length : 0),
    0,
  );

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
    </div>
  );
}
