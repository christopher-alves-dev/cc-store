"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatNumberToCurrency } from "@/helpers/format-number-to-currency";
import { Category } from "@prisma/client";
import { ArrowUpFromLineIcon } from "lucide-react";
import { useMemo } from "react";
import { DeleteButton } from "../../components/delete-button";
import { FormInput } from "../../components/form-input";
import { FormInputCurrency } from "../../components/form-input-currency";
import { SubmitButton } from "../../components/submit-button";
import { calculateTotalPrice } from "../../helpers/calculate-total-price";
import { createProduct } from "../actions/create-product";
import { useProductsForm } from "../hooks/useProductsForm";

type Props = {
  categories: Pick<Category, "id" | "name">[];
};

export const ProductsForm = ({ categories }: Props) => {
  // const [previewImg, setPreviewImg] = useState<string>();
  const { formMethods } = useProductsForm();
  const [price, discountPercentage, haveDiscount, images] = formMethods.watch([
    "price",
    "discountPercentage",
    "haveDiscount",
    "images",
  ]);

  const totalPrice: number = useMemo(
    () => calculateTotalPrice(String(price), Number(discountPercentage)),
    [price, discountPercentage],
  );

  return (
    <Form {...formMethods}>
      <form action={createProduct} className="flex flex-1 flex-col gap-8 ">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <FormInput
              name="name"
              control={formMethods.control}
              label="Nome"
              placeholder="Nome"
            />
          </div>

          <div className="relative h-10 cursor-pointer overflow-hidden rounded-md border-2 border-gray-800 py-2">
            <Input
              id="productImages"
              type="file"
              className="absolute inset-0"
              accept="image/*"
              {...formMethods.register("images")}
            />
            <Label
              htmlFor="productImages"
              className="absolute inset-0 flex cursor-pointer items-center justify-center gap-2 bg-background text-base font-bold"
            >
              <ArrowUpFromLineIcon size={20} />
              Adicionar Imagem
            </Label>
          </div>

          {/* {previewImg && (
            <div>
              <img
                src={previewImg}
                alt="teste"
                className="aspect-square w-20 object-contain"
              />
            </div>
          )} */}

          <div className="flex flex-col gap-3">
            <Label className="font-bold">Categorias</Label>

            <FormField
              control={formMethods.control}
              name="category"
              render={({ field }) => (
                <FormControl>
                  <RadioGroup {...field} className="grid grid-cols-2 space-y-1">
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

          <FormField
            control={formMethods.control}
            name="haveDiscount"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      if (!checked) {
                        formMethods.resetField("discountPercentage");
                      }

                      return field.onChange(checked);
                    }}
                  />
                </FormControl>

                <FormLabel>O produto possui desconto?</FormLabel>
              </FormItem>
            )}
          />

          {haveDiscount && (
            <>
              <div className="flex flex-col gap-3">
                <Label
                  htmlFor="discountPercentage"
                  className="text-base font-bold"
                >
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
            </>
          )}
        </div>
        <div className="mt-auto flex flex-col gap-5">
          <SubmitButton />

          <DeleteButton>Remover Produto</DeleteButton>
        </div>
      </form>
    </Form>
  );
};
