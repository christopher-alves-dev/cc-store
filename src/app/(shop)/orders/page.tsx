import { Badge } from "@/components/ui/badge";
import { authOptions } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { ShoppingBasket } from "lucide-react";
import { getServerSession } from "next-auth";
import { LoginButton } from "./components/login-button";
import { OrderItem } from "./components/order-item";

export default async function OrderPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <LoginButton />;
  }

  const orders = await prismaClient.order.findMany({
    where: {
      userId: session.user.id,
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
    <div className="mt-10 flex flex-col gap-5 px-5 xl:container">
      <Badge variant="heading">
        <ShoppingBasket size={16} />
        Meus Pedidos
      </Badge>

      <div className="flex flex-col gap-5">
        {orders.length ? (
          orders.map((order) => <OrderItem key={order.id} order={order} />)
        ) : (
          <p className="text-center font-semibold">Sem pedidos realizados</p>
        )}
      </div>
    </div>
  );
}
