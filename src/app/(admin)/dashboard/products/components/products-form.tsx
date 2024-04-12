"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatNumberToCurrency } from "@/helpers/format-number-to-currency";
import { Category } from "@prisma/client";
import { useMemo } from "react";
import { FormInput } from "../../components/form-input";
import { FormInputCurrency } from "../../components/form-input-currency";
import { useProductsForm } from "../hooks/useProductsForm";
import { calculateTotalPrice } from "../../helpers/calculate-total-price";

type Props = {
  categories: Pick<Category, "id" | "name">[];
};

export const ProductsForm = ({ categories }: Props) => {
  const { formMethods } = useProductsForm();
  const onSubmit = (e: any, errors: any) => {
    console.log({ e, errors });
  };
  const [price, discountPercentage] = formMethods.watch([
    "price",
    "discountPercentage",
  ]);

  const totalPrice: number = useMemo(
    () => calculateTotalPrice(price, discountPercentage),
    [price, discountPercentage],
  );

  return (
    <Form {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col gap-8"
      >
        <div className="flex flex-col gap-3">
          <FormInput
            name="name"
            control={formMethods.control}
            label="Nome"
            placeholder="Nome"
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

                  <FormMessage />
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <div className="flex flex-col gap-3">
          <FormInputCurrency
            name="price"
            control={formMethods.control}
            label="Preço"
            placeholder="R$ 0,00"
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
            <FormInput
              name="discountPercentage"
              control={formMethods.control}
              placeholder="0%"
              className="max-w-[100px]"
            />
            <span>%</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-base font-bold">Preço com Desconto</p>
          <p className="text-base font-normal">
            {formatNumberToCurrency(totalPrice)}
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
