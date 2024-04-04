import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { computeProductTotalPrice } from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";
import { ArrowUpFromLineIcon, PackageIcon, PlusIcon } from "lucide-react";
import {
  ProductWithTotalPriceAndCategory,
  ProductsTable,
} from "./components/products-table";
import { Checkbox } from "@/components/ui/checkbox";

export default async function ProductsDashboardPage() {
  const categories = await prismaClient.category.findMany({
    select: {
      name: true,
      id: true,
    },
  });

  const products = await prismaClient.product.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  const productsWithTotalPrice: ProductWithTotalPriceAndCategory[] =
    products.map((product) => ({
      ...product,
      totalPrice: computeProductTotalPrice(product),
    }));

  return (
    <div className="flex w-full flex-col gap-10 p-10">
      <Badge variant="heading">
        <PackageIcon size={18} />
        Produtos
      </Badge>

      <Sheet>
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-bold">
            Produtos encontrados: {products.length}
          </p>

          <SheetTrigger>
            <Button className="flex gap-2">
              <PlusIcon size={20} />
              Adicionar produto
            </Button>
          </SheetTrigger>
        </div>

        <SheetContent
          side="right"
          className="flex min-w-[400px] flex-col gap-8 px-8 py-10 lg:min-w-[450px]"
        >
          <SheetHeader className="text-left text-lg font-semibold">
            <Badge variant="heading">
              <PackageIcon size={18} />
              Adicionar produto
            </Badge>
          </SheetHeader>

          <div className="flex flex-col gap-3">
            <Label htmlFor="name" className="text-base font-bold">
              Nome
            </Label>
            <Input id="name" className="border-gray-800" placeholder="Nome" />
          </div>

          <div className="relative h-10 cursor-pointer overflow-hidden rounded-md border-2 border-gray-800 py-2">
            <Input
              id="productImages"
              type="file"
              className="absolute inset-0"
            />
            <Label
              htmlFor="productImages"
              className="absolute inset-0 flex cursor-pointer items-center justify-center gap-2 bg-background text-base font-bold"
            >
              <ArrowUpFromLineIcon size={20} />
              Adicionar Imagem
            </Label>
          </div>

          <div className="flex flex-col gap-3">
            <Label className="font-bold">Categorias</Label>

            <div>
              <RadioGroup className="grid grid-cols-2 gap-y-3">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center space-x-3"
                  >
                    <RadioGroupItem value={category.id} id={category.id} />
                    <Label htmlFor={category.id} className="font-normal">
                      {category.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="price" className="text-base font-bold">
              Preço
            </Label>
            <Input
              id="price"
              className="border-gray-800"
              placeholder="R$ 0,00"
            />
          </div>

          <div className="items-top flex space-x-3">
            <Checkbox id="productWithDiscount" />
            <Label htmlFor="productWithDiscount">Produto com Desconto</Label>
          </div>

          <div className="flex flex-col gap-3">
            <Label htmlFor="discountPercentage" className="text-base font-bold">
              Porcentagem de Desconto
            </Label>

            <div className="flex items-center gap-2">
              <Input
                id="discountPercentage"
                className="max-w-[100px] border-gray-800"
                placeholder="0%"
                type="number"
              />
              <span>%</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-base font-bold">Preço com Desconto</p>
            <p className="text-base font-normal">
              Colocar preço normal menos a porcentagem de desconto
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <Button className="w-full">Salvar</Button>
            <Button className="w-full" variant="secondary">
              Remover produto
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <ProductsTable products={productsWithTotalPrice} />
    </div>
  );
}
