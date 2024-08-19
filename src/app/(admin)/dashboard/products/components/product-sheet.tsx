"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useProductManager } from "@/stores/product-manager";

import { useSheetControl } from "@/stores/sheet-control";
import { Category } from "@prisma/client";
import { PackageIcon, PlusIcon, X } from "lucide-react";
import { ProductsForm } from "./products-form";
import { twMerge } from "tailwind-merge";

type Props = {
  categories: Pick<Category, "id" | "name">[];
  className?: string;
};

export const ProductSheet = ({ categories, className }: Props) => {
  const { isOpen, toggle } = useSheetControl((state) => ({
    isOpen: state.products,
    toggle: state.toggle,
  }));
  const { resetProduct, productId } = useProductManager((state) => ({
    resetProduct: state.resetProduct,
    productId: state.product?.id,
  }));

  const handleOpenSheetWithoutData = () => {
    resetProduct();

    toggle("products");
  };

  return (
    <Sheet open={isOpen}>
      <SheetTrigger asChild>
        <Button
          className={twMerge("flex gap-2", className)}
          onClick={handleOpenSheetWithoutData}
        >
          <PlusIcon size={20} />
          Adicionar produto
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-8 overflow-y-auto px-8 py-10 sm:max-w-[400px] lg:max-w-[500px]"
      >
        <SheetHeader className="text-left text-lg font-semibold">
          <Badge variant="heading">
            <PackageIcon size={18} />
            {productId ? "Atualizar" : "Adicionar"} produto
          </Badge>
        </SheetHeader>

        <ProductsForm
          categories={categories}
          onCreateProduct={() => toggle("products")}
        />

        <SheetClose
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
          onClick={() => toggle("products")}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};
