import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatNumberToCurrency } from "@/helpers/format-number-to-currency";
import { ProductWithTotalPrice } from "@/helpers/product";

type Props = {
  products: ProductWithTotalPrice[];
};

export const ProductsTable = ({ products }: Props) => {
  return (
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
            <TableCell>Categoria</TableCell>
            <TableCell>{formatNumberToCurrency(product.totalPrice)}</TableCell>
            <TableCell>
              {formatNumberToCurrency(Number(product.basePrice))}
            </TableCell>

            <TableCell>0</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
