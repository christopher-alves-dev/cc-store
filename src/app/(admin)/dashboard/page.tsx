import { createClient } from "@/lib/supabase/server";
import { FinancialCard } from "../components/financial-card";
import { useAuthUser } from "./hooks/useAuthUser";
import { DollarSign, Landmark } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default async function DashboardPage() {
  const supabase = createClient();

  await useAuthUser();

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

  return (
    <div className="mt-10 flex flex-col gap-8 px-5">
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
            "absolute -left-2 bg-primary md:top-1/2 md:flex md:-translate-y-1/2 md:group-data-[hide-arrow-md=true]:hidden lg:group-data-[hide-arrow-lg=true]:hidden"
          }
        />
        <CarouselNext
          className={
            "absolute -right-2 bg-primary md:top-1/2 md:flex md:-translate-y-1/2 md:group-data-[hide-arrow-md=true]:hidden lg:group-data-[hide-arrow-lg=true]:hidden"
          }
        />
      </Carousel>
    </div>
  );
}
