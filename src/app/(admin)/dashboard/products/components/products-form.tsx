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
import {
  ChangeEvent,
  useCallback,
  useMemo,
  useState,
  useTransition,
} from "react";
import { FormInput } from "../../components/form-input";
import { FormInputCurrency } from "../../components/form-input-currency";
import { useProductsForm } from "../hooks/useProductsForm";
import { calculateTotalPrice } from "../../helpers/calculate-total-price";
import { Input } from "@/components/ui/input";
import { ArrowUpFromLineIcon } from "lucide-react";
import { uploadFile } from "@/actions/upload-file";
import { useForm } from "react-hook-form";

type Props = {
  categories: Pick<Category, "id" | "name">[];
};

export const ProductsForm = ({ categories }: Props) => {
  const [isPending, startTransition] = useTransition();
  // const [previewImg, setPreviewImg] = useState<string>();
  const { formMethods } = useProductsForm();
  // const [price, discountPercentage, productHaveDiscount, images] =
  //   formMethods.watch([
  //     "price",
  //     "discountPercentage",
  //     "productHaveDiscount",
  //     "images",
  //   ]);

  const handleUploadFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      reader.result;
    };
    reader.readAsDataURL(file);

    console.log("uploading file");
    console.log({ file });
  };

  const onSubmit = formMethods.handleSubmit((data) => {
    const formData = new FormData();
    console.log({ data: data.images[0] });
    formData.append("file", data.images[0]);

    startTransition(() => {
      uploadFile(formData)
        .then((response) => {
          const url = response?.url;

          if (!url) return;

          return fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "image/png",
            },
            body: data.images[0],
          });
        })
        .then((res) => {
          console.log({ res });
        });
    });
  });

  // const totalPrice: number = useMemo(
  //   () => calculateTotalPrice(String(price), Number(discountPercentage)),
  //   [price, discountPercentage],
  // );

  return (
    <Form {...formMethods}>
      <form onSubmit={onSubmit} className="flex flex-1 flex-col gap-8 ">
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
              // onChange={(event: ChangeEvent<HTMLInputElement>) => {
              //   if (event?.target?.files?.[0]) {
              //     const file = event.target.files[0];
              //     formMethods.setValue("images", file);
              //     const reader = new FileReader();
              //     // reader.onloadend = () => {
              //     //   setPreviewImg(reader.result as string);
              //     // };
              //     // reader.readAsDataURL(file);
              //   }
              // }}
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

          {/* <div className="flex flex-col gap-3">
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

          {productHaveDiscount && (
            <div className="flex flex-col gap-3">
              <p className="text-base font-bold">Preço com Desconto</p>
              <p className="text-base font-normal">
                {formatNumberToCurrency(totalPrice)}
              </p>
            </div>
          )}*/}
        </div>
        <div className="mt-auto flex flex-col gap-5">
          <Button type="submit" className="w-full">
            Salvar
          </Button>
          <Button className="w-full" variant="secondary">
            Remover produto
          </Button>
        </div>
      </form>
    </Form>
  );
};
