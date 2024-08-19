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
import { useCategoryManager } from "@/stores/category-manager";
import { useSheetControl } from "@/stores/sheet-control";
import { LayoutList, PlusIcon, X } from "lucide-react";
import { CategoryForm } from "./category-form";
import { twMerge } from "tailwind-merge";

type Props = {
  className?: string;
};

export const CategorySheet = ({ className }: Props) => {
  const { isOpen, toggle } = useSheetControl((state) => ({
    isOpen: state.categories,
    toggle: state.toggle,
  }));

  const { categoryId, resetCategory } = useCategoryManager((state) => ({
    resetCategory: state.resetCategory,
    categoryId: state.category?.id,
  }));

  const handleOpenSheetWithoutData = () => {
    resetCategory();
    toggle("categories");
  };

  return (
    <Sheet open={isOpen}>
      <SheetTrigger asChild>
        <Button
          className={twMerge("flex gap-2", className)}
          onClick={handleOpenSheetWithoutData}
        >
          <PlusIcon size={20} />
          Adicionar Categoria
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-8 overflow-y-auto px-8 py-10 sm:max-w-[400px] lg:max-w-[500px]"
      >
        <SheetHeader className="text-left text-lg font-semibold">
          <Badge variant="heading">
            <LayoutList size={18} />
            {categoryId ? "Atualizar" : "Adicionar"} categoria
          </Badge>
        </SheetHeader>

        <CategoryForm onCreateCategory={() => toggle("categories")} />

        <SheetClose
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
          onClick={() => toggle("categories")}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
};
