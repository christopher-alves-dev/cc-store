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
import { DataTable } from "@/components/ui/data-table";
import { ProductWithTotalPriceAndCategory } from "@/types/product";
import { useProductsTable } from "../hooks/useProductsTable";

type Props = {
  products: ProductWithTotalPriceAndCategory[];
};

export const ProductsTable = ({ products }: Props) => {
  const {
    columns,
    handleDeleteProduct,
    openConfirmDelete,
    product,
    setOpenConfirmDelete,
  } = useProductsTable();

  return (
    <>
      <DataTable columns={columns} data={products} />

      <AlertDialog open={openConfirmDelete} onOpenChange={setOpenConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir produto</AlertDialogTitle>
            <AlertDialogDescription>
              Você tem certeza que deseja excluir o produto{" "}
              <span className="font-bold text-primary">{product?.name}?</span>{" "}
              Esta ação não poderá ser desfeita e o produto será permanentemente
              removido.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProduct}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
