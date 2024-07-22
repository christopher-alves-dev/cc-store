"use client";

import { logout } from "@/app/(admin)/login/actions";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboardIcon,
  ListOrderedIcon,
  LogOut,
  PackageIcon,
  PackageSearchIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export const Sidebar = ({ className }: Props) => {
  const pathname = usePathname();

  return (
    <div
      className={twMerge(
        "flex-col items-center gap-8 border-r border-solid border-accent bg-background p-8",
        className,
      )}
    >
      <h1 className="text-lg font-semibold">
        <span className="text-primary">FSW</span> Store
      </h1>

      <div className="flex w-full flex-col gap-3">
        <Link href="/dashboard">
          <Button
            data-active={pathname === "/dashboard"}
            variant="outline"
            className="flex w-full justify-start gap-2 text-base"
          >
            <LayoutDashboardIcon className="h-[1em] w-[1em]" />
            Dashboard
          </Button>
        </Link>

        <Link href="/dashboard/products">
          <Button
            data-active={pathname.includes("/products")}
            variant="outline"
            className="flex w-full justify-start gap-2 text-base"
          >
            <PackageIcon className="h-[1em] w-[1em]" />
            Produtos
          </Button>
        </Link>

        <Link href="/dashboard/categories">
          <Button
            data-active={pathname.includes("/categories")}
            variant="outline"
            className="flex w-full justify-start gap-2 text-base"
          >
            <ListOrderedIcon className="h-[1em] w-[1em]" />
            Categorias
          </Button>
        </Link>

        <Link href="/dashboard/orders">
          <Button
            data-active={pathname.includes("/orders")}
            variant="outline"
            className="flex w-full justify-start gap-2 text-base"
          >
            <PackageSearchIcon className="h-[1em] w-[1em]" />
            Pedidos
          </Button>
        </Link>
      </div>

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
    </div>
  );
};
