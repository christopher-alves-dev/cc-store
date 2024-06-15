"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCategoryManager } from "@/stores/category-manager";
import { useSheetControl } from "@/stores/sheet-control";
import { LayoutList, PlusIcon } from "lucide-react";
import { CategoryForm } from "./category-form";

export const CategorySheet = () => {
  const { isOpen, toggle } = useSheetControl((state) => ({
    isOpen: state.isOpen,
    toggle: state.toggle,
  }));

  const { categoryId, resetCategory } = useCategoryManager((state) => ({
    resetCategory: state.resetCategory,
    categoryId: state.category?.id,
  }));

  const handleOpenSheetWithoutData = () => {
    resetCategory();
    console.log("aquiii");
    toggle(true);
  };

  return (
    <Sheet open={isOpen} onOpenChange={toggle}>
      <SheetTrigger asChild>
        <Button className="flex gap-2" onClick={handleOpenSheetWithoutData}>
          <PlusIcon size={20} />
          Adicionar Categoria
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex min-w-[400px] flex-col gap-8 overflow-y-auto px-8 py-10 lg:min-w-[450px]"
      >
        <SheetHeader className="text-left text-lg font-semibold">
          <Badge variant="heading">
            <LayoutList size={18} />
            {categoryId ? "Atualizar" : "Adicionar"} categoria
          </Badge>
        </SheetHeader>

        <CategoryForm onCreateCategory={toggle} />
      </SheetContent>
    </Sheet>
  );
};
