"use client";

import { useCartStore } from "@/stores/cart";
import {
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  Percent,
  ShoppingBasket,
  ShoppingCartIcon,
  User,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Badge } from "./badge";
import { Button } from "./button";
import { Card } from "./card";
import { Cart } from "./cart";
import { Separator } from "./separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./sheet";
import { UserDropdownMenu } from "./user-dropdown-menu";

export const Header = () => {
  const pathname = usePathname();

  const products = useCartStore((state) => state.products);
  const { status, data } = useSession();
  const isAuthenticated = status === "authenticated";

  const handleLoginClick = async () => {
    await signIn();
  };

  const handleLogoutClick = async () => {
    await signOut();
  };
  return (
    <Card className="mb-8 flex items-center justify-between rounded-tl-none rounded-tr-none border-2 border-gray-800 p-5 lg:px-12">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="lg:hidden">
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent side="left">
          <SheetHeader className="text-left text-lg font-semibold">
            Menu
          </SheetHeader>

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
                  <p className="font-medium">{data.user.name}</p>
                  <span className="text-sm brightness-50">Boas compras!</span>
                </div>
              </div>
              <Separator />
            </div>
          )}

          <div className="mt-4 flex flex-col gap-2">
            {!isAuthenticated && (
              <Button
                onClick={handleLoginClick}
                variant="outline"
                className="w-full justify-start gap-2"
              >
                <LogInIcon size={16} />
                Fazer Login
              </Button>
            )}

            {isAuthenticated && (
              <Button
                onClick={handleLogoutClick}
                variant="outline"
                className="w-full justify-start gap-2"
              >
                <LogOutIcon size={16} />
                Logout
              </Button>
            )}

            <SheetClose asChild>
              <Link href="/">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <HomeIcon size={16} />
                  Início
                </Button>
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href="/orders">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <ShoppingBasket size={16} />
                  Meus Pedidos
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href="/deals">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <Percent size={16} />
                  Ofertas
                </Button>
              </Link>
            </SheetClose>

            <SheetClose asChild>
              <Link href="/catalog">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <ListOrderedIcon size={16} />
                  Catálogo
                </Button>
              </Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>

      <Link href="/">
        <h1 className="text-lg font-semibold">
          <span className="text-primary">FSW</span> Store
        </h1>
      </Link>

      <div className="hidden lg:flex">
        <Link href="/">
          <Button
            variant="link"
            className="w-full justify-start gap-2"
            data-active={pathname === "/"}
          >
            Início
          </Button>
        </Link>

        <Separator orientation="vertical" />

        <Link href="/catalog">
          <Button
            variant="link"
            className="w-full justify-start gap-2"
            data-active={pathname === "/catalog"}
          >
            Catálogo
          </Button>
        </Link>

        <Link href="/deals">
          <Button
            variant="link"
            className="w-full justify-start gap-2"
            data-active={pathname === "/deals"}
          >
            Ofertas
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-8">
        {data?.user ? (
          <UserDropdownMenu />
        ) : (
          <Button
            size="icon"
            variant="outline"
            className="hidden lg:flex"
            onClick={handleLoginClick}
          >
            <User />
          </Button>
        )}

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="relative">
              <ShoppingCartIcon />
              {products.length > 0 && (
                <Badge className="absolute -right-2 -top-1 flex items-center justify-center rounded-full px-1.5 py-1">
                  <span className="leading-none">{products.length}</span>
                </Badge>
              )}
            </Button>
          </SheetTrigger>

          <SheetContent className="min-w-[370px] lg:min-w-[500px]">
            <Cart />
          </SheetContent>
        </Sheet>
      </div>
    </Card>
  );
};
