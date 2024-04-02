import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import Link from "next/link";
import { LogOutIcon, ShoppingBasket } from "lucide-react";

export const UserDropdownMenu = () => {
  const { data, status } = useSession();
  const isAuthenticated = status === "authenticated";

  const handleLogoutClick = async () => {
    await signOut();
  };

  return (
    <DropdownMenu>
      {isAuthenticated && data?.user && (
        <div className="flex flex-col">
          <div className="my-4 flex items-center gap-2">
            <Avatar>
              <AvatarFallback>
                {data?.user?.name?.[0].toUpperCase()}
              </AvatarFallback>

              {data?.user?.image && <AvatarImage src={data.user.image} />}
            </Avatar>

            <div className="flex flex-col">
              <p className="font-medium">Olá, {data.user.name}</p>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="link"
                  className="h-auto justify-start p-0 text-sm font-normal uppercase brightness-50"
                >
                  minha conta
                </Button>
              </DropdownMenuTrigger>
            </div>
          </div>
        </div>
      )}

      <DropdownMenuContent className="h-fit w-fit">
        <DropdownMenuItem>
          <Link href="/orders">
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              size="sm"
            >
              <ShoppingBasket size={16} />
              Meus Pedidos
            </Button>
          </Link>
        </DropdownMenuItem>
        {isAuthenticated && (
          <DropdownMenuItem>
            <Button
              onClick={handleLogoutClick}
              variant="outline"
              className="w-full justify-start gap-2"
              size="sm"
            >
              <LogOutIcon size={16} />
              Logout
            </Button>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
