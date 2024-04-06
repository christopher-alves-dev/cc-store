import { OrderItem } from "@/components/ui/order-item";
import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { getServerSession } from "next-auth";

import { CheckCircleIcon } from "lucide-react";

export default async function PurchaseCompletePage() {
  const session = await getServerSession(authOptions);

  const orders = await prismaClient.order.findMany({
    where: {
      userId: session!.user.id,
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  const lastOrder = orders[orders.length - 1];

  return (
    <div className="mt-10 grid grid-cols-1 gap-10 px-5 xl:container lg:grid-cols-12">
      <div className="grid h-fit grid-cols-1 gap-4 lg:col-span-3">
        <div className="flex flex-col gap-8">
          <CheckCircleIcon size={60} className="text-green-500" />
          <p className="text-xl font-bold">Obrigado pelo seu pedido!</p>
        </div>

        <p>
          Seu pedido será processado em até 24 horas e te notificaremos através
          do seu email, assim que o pedido for entregue à transportadora.
        </p>
      </div>

      <div className="lg:col-span-9">
        <OrderItem order={lastOrder} defaultValue={lastOrder.id} />
      </div>
    </div>
  );
}
