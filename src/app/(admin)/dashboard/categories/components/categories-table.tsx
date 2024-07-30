"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { ProductWithTotalPrice } from "@/helpers/product";
import { useCategoryManager } from "@/stores/category-manager";
import { useSheetControl } from "@/stores/sheet-control";
import { Category, Prisma } from "@prisma/client";
import { CircleEllipsis } from "lucide-react";
import { useState } from "react";
import { deleteCategory } from "../actions/delete-category";

export type ProductWithTotalPriceAndCategory = ProductWithTotalPrice & {
  category: {
    name: string;
  };
};

type Props = {
  categories: Prisma.CategoryGetPayload<{
    include: {
      products: {
        select: {
          id: true;
        };
      };
    };
  }>[];
};

export const CategoriesTable = ({ categories }: Props) => {
  const { category, resetCategory, updateCategory } = useCategoryManager(
    (state) => ({
      category: state.category,
      updateCategory: state.updateCategory,
      resetCategory: state.resetCategory,
    }),
  );
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const toggle = useSheetControl((state) => state.toggle);

  const handleEditCategory = (category: Category) => {
    updateCategory(category);
    toggle("categories");
  };

  const handleConfirmDeleteCategory = (category: Category) => {
    updateCategory(category);
    setOpenConfirmDelete((prevState) => !prevState);
  };

  const handleDeleteCategory = async () => {
    if (!category?.id) return;

    const result = await deleteCategory(category.id);

    if (result?.error?.message) {
      return toast({
        title: "Erro!",
        variant: "destructive",
        description: result.error.message,
      });
    }

    toast({
      title: "Sucesso!",
      variant: "success",
      description: result.success?.message,
    });

    resetCategory();
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Porcentagem das vendas</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.products.length}</TableCell>
              <TableCell>0%</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="cursor-pointer">
                    <CircleEllipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => handleEditCategory(category)}
                    >
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => handleConfirmDeleteCategory(category)}
                    >
                      Deletar
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AlertDialog open={openConfirmDelete} onOpenChange={setOpenConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir produto</AlertDialogTitle>
            <AlertDialogDescription>
              Você tem certeza que deseja excluir a categoria{" "}
              <span className="font-bold text-primary">{category?.name}?</span>{" "}
              Esta ação não poderá ser desfeita e a categoria será
              permanentemente removida.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCategory}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
