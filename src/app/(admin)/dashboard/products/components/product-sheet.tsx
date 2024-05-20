"use client";

import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PackageIcon } from "lucide-react";
import { ReactNode, useState } from "react";
import { ProductsForm } from "./products-form";
import { Category } from "@prisma/client";

type Props = {
  triggerElement: ReactNode;
  categories: Pick<Category, "id" | "name">[];
};

export const ProductSheet = ({ triggerElement, categories }: Props) => {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>{triggerElement}</SheetTrigger>
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

        <ProductsForm categories={categories} onCreateProduct={setSheetOpen} />
      </SheetContent>
    </Sheet>
  );
};
