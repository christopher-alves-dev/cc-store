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
import { ProductWithTotalPrice } from "@/helpers/product";
import { CircleEllipsis } from "lucide-react";
import { useState } from "react";
import { deleteProduct } from "../actions/delete-product";

export type ProductWithTotalPriceAndCategory = ProductWithTotalPrice & {
  category: {
    name: string;
  };
};

type Props = {
  products: ProductWithTotalPriceAndCategory[];
};

export const ProductsTable = ({ products }: Props) => {
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [productToDelete, setProductToDelete] =
    useState<ProductWithTotalPriceAndCategory>(
      {} as ProductWithTotalPriceAndCategory,
    );

  const handleConfirmDeleteProduct = (
    product: ProductWithTotalPriceAndCategory,
  ) => {
    setProductToDelete(product);
    setOpenConfirmDelete((prevState) => !prevState);
  };

  const handleDeleteProduct = async (
    product: ProductWithTotalPriceAndCategory,
  ) => {
    const formData = new FormData();
    formData.append("id", product.id);

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
                    <DropdownMenuItem className="cursor-pointer">
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
              <span className="font-bold text-primary">
                {productToDelete.name}?
              </span>{" "}
              Esta ação não poderá ser desfeita e o produto será permanentemente
              removido.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDeleteProduct(productToDelete)}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
