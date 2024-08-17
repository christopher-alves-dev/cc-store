"use client";

import { logout } from "@/app/(admin)/login/actions";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { useSheetControl } from "@/stores/sheet-control";
import {
  LayoutDashboardIcon,
  ListOrderedIcon,
  LogOut,
  PackageIcon,
  PackageSearchIcon,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  const pathname = usePathname();
  const toggle = useSheetControl((state) => state.toggle);

  return (
    <div
      className={twMerge(
        "flex flex-col items-center gap-8 bg-background p-8 lg:border-r lg:border-solid lg:border-accent",
        className,
      )}
    >
      <h1 className="text-xl font-semibold">
        <span className="text-primary">FSW</span> Store
      </h1>

      <nav className="flex w-full flex-col gap-3">
        <Link href="/dashboard" onClick={() => toggle("menu")}>
          <Button
            data-active={pathname === "/dashboard"}
            variant="outline"
            className="flex w-full justify-start gap-2 text-base"
          >
            <LayoutDashboardIcon className="h-[1em] w-[1em]" />
            Dashboard
          </Button>
        </Link>

        <Link href="/dashboard/products" onClick={() => toggle("menu")}>
          <Button
            data-active={pathname.includes("/products")}
            variant="outline"
            className="flex w-full justify-start gap-2 text-base"
          >
            <PackageIcon className="h-[1em] w-[1em]" />
            Produtos
          </Button>
        </Link>

        <Link href="/dashboard/categories" onClick={() => toggle("menu")}>
          <Button
            data-active={pathname.includes("/categories")}
            variant="outline"
            className="flex w-full justify-start gap-2 text-base"
          >
            <ListOrderedIcon className="h-[1em] w-[1em]" />
            Categorias
          </Button>
        </Link>

        <Link href="/dashboard/orders" onClick={() => toggle("menu")}>
          <Button
            data-active={pathname.includes("/orders")}
            variant="outline"
            className="flex w-full justify-start gap-2 text-base"
          >
            <PackageSearchIcon className="h-[1em] w-[1em]" />
            Pedidos
          </Button>
        </Link>
      </nav>

      <form className="w-full">
        <Button
          formAction={logout}
          variant="outline"
          className="flex w-full justify-start gap-2 text-base"
        >
          <LogOut className="h-[1em] w-[1em]" />
          Sair
        </Button>
      </form>

      <SheetClose
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary lg:hidden"
        onClick={() => toggle("menu")}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetClose>
    </div>
  );
};
