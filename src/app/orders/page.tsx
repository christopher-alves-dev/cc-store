import { Badge } from "@/components/ui/badge";
import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { ShoppingBasket } from "lucide-react";
import { getServerSession } from "next-auth";
import { OrderItem } from "./components/order-item";

export default async function OrderPage() {
  const user = getServerSession(authOptions);

  if (!user) {
    //TODO: redirect to login
    return <p>Faça login</p>;
  }

  const orders = await prismaClient.order.findMany({
    where: {
      userId: (user as any).id,
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  return (
    <div className="p-5">
      <Badge
        className="w-fit gap-1 border-2 border-primary px-3 py-1.5 text-base uppercase"
        variant="outline"
      >
        <ShoppingBasket size={16} />
        Meus Pedidos
      </Badge>

      <div className="flex flex-col gap-5">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}
