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
import { formatNumberToCurrency } from "@/helpers/format-number-to-currency";
import { useProductManager } from "@/stores/product-manager";
import { useProductSheet } from "@/stores/product-sheet";
import { ProductWithTotalPriceAndCategory } from "@/types/product";
import { CircleEllipsis } from "lucide-react";
import { useState } from "react";
import { deleteProduct } from "../actions/delete-product";

type Props = {
  products: ProductWithTotalPriceAndCategory[];
};

export const ProductsTable = ({ products }: Props) => {
  const { product, updateProduct, resetProduct } = useProductManager();
  const { toggle } = useProductSheet();
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const handleEditProduct = (product: ProductWithTotalPriceAndCategory) => {
    updateProduct(product);
    toggle(true);
  };

  const handleConfirmDeleteProduct = (
    product: ProductWithTotalPriceAndCategory,
  ) => {
    updateProduct(product);
    setOpenConfirmDelete((prevState) => !prevState);
  };

  const handleDeleteProduct = async () => {
    if (!product?.id) return;

    const result = await deleteProduct(product.id);

    if (result?.error) {
      return toast({
        title: "Erro!",
        variant: "destructive",
        description:
          "Ops, houve um erro ao deletar o produto. Tente novamente mais tarde.",
      });
    }

    toast({
      title: "Sucesso!",
      variant: "success",
      description: "Produto deletado com sucesso!",
    });
    resetProduct();
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Preço total</TableHead>
            <TableHead>Preço base</TableHead>
            <TableHead>Vendidos</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell>
                {formatNumberToCurrency(product.totalPrice)}
              </TableCell>
              <TableCell>
                {formatNumberToCurrency(Number(product.basePrice))}
              </TableCell>

              <TableCell>0</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="cursor-pointer">
                    <CircleEllipsis />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => handleEditProduct(product)}
                    >
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => handleConfirmDeleteProduct(product)}
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
