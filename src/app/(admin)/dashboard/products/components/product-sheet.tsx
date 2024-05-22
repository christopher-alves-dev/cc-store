"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useProductManager } from "@/stores/product-manager";
import { useProductSheet } from "@/stores/product-sheet";
import { Category } from "@prisma/client";
import { PackageIcon, PlusIcon } from "lucide-react";
import { ProductsForm } from "./products-form";

type Props = {
  categories: Pick<Category, "id" | "name">[];
};

export const ProductSheet = ({ categories }: Props) => {
  const { isOpen, toggle } = useProductSheet();
  const { resetProduct } = useProductManager();

  const handleOpenSheetWithoutData = () => {
    resetProduct();
    toggle(true);
  };

  return (
    <Sheet open={isOpen} onOpenChange={toggle}>
      <SheetTrigger asChild>
        <Button className="flex gap-2" onClick={handleOpenSheetWithoutData}>
          <PlusIcon size={20} />
          Adicionar produto
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex min-w-[400px] flex-col gap-8 overflow-y-auto px-8 py-10 lg:min-w-[450px]"
      >
        <SheetHeader className="text-left text-lg font-semibold">
          <Badge variant="heading">
            <PackageIcon size={18} />
            Adicionar produto
          </Badge>
        </SheetHeader>

        <ProductsForm categories={categories} onCreateProduct={toggle} />
      </SheetContent>
    </Sheet>
  );
};
