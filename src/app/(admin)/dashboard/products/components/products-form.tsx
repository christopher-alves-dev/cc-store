"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProductsForm } from "../hooks/useProductsForm";
import { ArrowUpFromLineIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Category } from "@prisma/client";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

type Props = {
  categories: Pick<Category, "id" | "name">[];
};

export const ProductsForm = ({ categories }: Props) => {
  const { formMethods } = useProductsForm();
  console.log({ erros: formMethods.formState.errors });
  const onSubmit = (e: any, errors: any) => {
    console.log({ e, errors });
  };

  return (
    <Form {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <div className="flex flex-col gap-3">
          <Label htmlFor="name" className="text-base font-bold">
            Nome
          </Label>
          <Input
            id="name"
            className="border-gray-800"
            placeholder="Nome"
            {...formMethods.register("name")}
          />
        </div>

        {/* <div className="relative h-10 cursor-pointer overflow-hidden rounded-md border-2 border-gray-800 py-2">
          <Input
            id="productImages"
            type="file"
            className="absolute inset-0"
            {...formMethods.register("images")}
          />
          <Label
            htmlFor="productImages"
            className="absolute inset-0 flex cursor-pointer items-center justify-center gap-2 bg-background text-base font-bold"
          >
            <ArrowUpFromLineIcon size={20} />
            Adicionar Imagem
          </Label>
        </div> */}

        <div className="flex flex-col gap-3">
          <Label className="font-bold">Categorias</Label>

          <FormField
            control={formMethods.control}
            name="category"
            render={({ field }) => (
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 space-y-1"
                >
                  {categories.map((category) => (
                    <FormItem
                      key={category.id}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value={category.name} />
                      </FormControl>
                      <FormLabel className="mt-0 font-normal">
                        {category.name}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="price" className="text-base font-bold">
            Preço
          </Label>
          <Input
            id="price"
            className="border-gray-800"
            placeholder="R$ 0,00"
            {...formMethods.register("price")}
          />
        </div>

        <div className="items-top flex space-x-3">
          <Checkbox
            id="productHaveDiscount"
            onCheckedChange={(cheked) =>
              formMethods.setValue("productHaveDiscount", Boolean(cheked))
            }
          />
          <Label htmlFor="productHaveDiscount">Produto com Desconto</Label>
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
              {...formMethods.register("discountPercentage")}
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

        <div className="mt-auto flex flex-col gap-5">
          <Button className="w-full">Salvar</Button>
          <Button className="w-full" variant="secondary">
            Remover produto
          </Button>
        </div>
      </form>
    </Form>
  );
};
