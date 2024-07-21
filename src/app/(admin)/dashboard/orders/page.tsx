import { OrderItem } from "@/components/ui/order-item";
import { prismaClient } from "@/lib/prisma";
import { useAuthUser } from "../hooks/useAuthUser";

export default async function DashboardOrdersPage() {
  await useAuthUser();

  const orders = await prismaClient.order.findMany({
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <div className="flex w-full flex-col gap-10 p-10">
      <div className="flex w-full items-center justify-between">
        <p className="text-lg font-bold">
          Pedidos encontrados: {orders.length}
        </p>
      </div>

      <div className="flex h-full flex-col gap-2 overflow-auto">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
