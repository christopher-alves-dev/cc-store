import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductWithTotalPrice } from "@/helpers/product";
import { Prisma } from "@prisma/client";

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
  return (
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
