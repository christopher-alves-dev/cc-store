import { Button } from "@/components/ui/button";
import {
  LayoutDashboardIcon,
  ListOrderedIcon,
  PackageIcon,
  PackageSearchIcon,
} from "lucide-react";

export const Sidebar = () => {
  return (
    <div className="flex min-w-[300px] flex-col items-center gap-8 border-r border-solid border-accent bg-background p-8">
      <h1 className="text-lg font-semibold">
        <span className="text-primary">FSW</span> Store
      </h1>

      <div className="flex w-full flex-col gap-3">
        <Button
          variant="outline"
          className="flex justify-start gap-2 text-base"
        >
          <LayoutDashboardIcon className="h-[1em] w-[1em]" />
          Dashboard
        </Button>
        <Button
          variant="outline"
          className="flex justify-start gap-2 text-base"
        >
          <PackageIcon className="h-[1em] w-[1em]" />
          Produtos
        </Button>
        <Button
          variant="outline"
          className="flex justify-start gap-2 text-base"
        >
          <ListOrderedIcon className="h-[1em] w-[1em]" />
          Categorias
        </Button>
        <Button
          variant="outline"
          className="flex justify-start gap-2 text-base"
        >
          <PackageSearchIcon className="h-[1em] w-[1em]" />
          Pedidos
        </Button>
      </div>
    </div>
  );
};
