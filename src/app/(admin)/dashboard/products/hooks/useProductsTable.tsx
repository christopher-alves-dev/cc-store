import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { formatNumberToCurrency } from "@/helpers/format-number-to-currency";
import { useProductManager } from "@/stores/product-manager";
import { useSheetControl } from "@/stores/sheet-control";
import { ProductWithTotalPriceAndCategory } from "@/types/product";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown, CircleEllipsis } from "lucide-react";
import { useState } from "react";
import { deleteProduct } from "../actions/delete-product";
import { Button } from "@/components/ui/button";

export const useProductsTable = () => {
  const { product, updateProduct, resetProduct } = useProductManager(
    (state) => ({
      product: state.product,
      updateProduct: state.updateProduct,
      resetProduct: state.resetProduct,
    }),
  );
  const toggle = useSheetControl((state) => state.toggle);
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);

  const handleEditProduct = (product: ProductWithTotalPriceAndCategory) => {
    updateProduct(product);
    toggle("products");
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

  const columns: ColumnDef<ProductWithTotalPriceAndCategory>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        const isAscSorted = column.getIsSorted() === "asc";
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(isAscSorted)}
          >
            Nome
            {isAscSorted ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
    },
    {
      accessorKey: "category.name",
      header: ({ column }) => {
        const isAscSorted = column.getIsSorted() === "asc";
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(isAscSorted)}
          >
            Categoria
            {isAscSorted ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
    },
    {
      accessorKey: "totalPrice",
      header: ({ column }) => {
        const isAscSorted = column.getIsSorted() === "asc";
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(isAscSorted)}
          >
            Preço total
            {isAscSorted ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      cell: ({ row }) => {
        const formatted = formatNumberToCurrency(row.getValue("totalPrice"));

        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "basePrice",
      header: ({ column }) => {
        const isAscSorted = column.getIsSorted() === "asc";
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(isAscSorted)}
          >
            Preço base
            {isAscSorted ? (
              <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDown className="ml-2 h-4 w-4" />
            )}
          </Button>
        );
      },
      cell: ({ row }) => {
        const formatted = formatNumberToCurrency(row.getValue("basePrice"));

        return <div className="font-medium">{formatted}</div>;
      },
    },
    {
      id: "actions",
      header: "Ações",
      cell: ({ row }) => {
        const product = row.original;

        return (
          <div className="flex items-center justify-end">
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
          </div>
        );
      },
    },
  ];

  return {
    columns,
    product,
    openConfirmDelete,
    setOpenConfirmDelete,
    handleDeleteProduct,
  };
};
