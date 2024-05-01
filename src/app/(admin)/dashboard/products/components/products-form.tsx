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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatNumberToCurrency } from "@/helpers/format-number-to-currency";
import { Category } from "@prisma/client";
import { ArrowUpFromLineIcon, Trash } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { DeleteButton } from "../../components/delete-button";
import { FormInput } from "../../components/form-input";
import { FormInputCurrency } from "../../components/form-input-currency";
import { SubmitButton } from "../../components/submit-button";
import { calculateTotalPrice } from "../../helpers/calculate-total-price";
import { createProduct } from "../actions/create-product";
import { useProductsForm } from "../hooks/useProductsForm";
import { ProductsSchemaType } from "../schema";

type ImagePreviewState = {
  url: string;
  file: File;
};

type Props = {
  categories: Pick<Category, "id" | "name">[];
};

export const ProductsForm = ({ categories }: Props) => {
  const [imagesPreview, setImagesPreview] = useState<ImagePreviewState[]>([]);
  const { formMethods } = useProductsForm();

  const [price, discountPercentage, haveDiscount] = formMethods.watch([
    "price",
    "discountPercentage",
    "haveDiscount",
  ]);

  const handleDeleteImage = (imageToRemove: File) => {
    const filteredImages = imagesPreview.filter(
      (image) => image.file.name !== imageToRemove.name,
    );

    formMethods.setValue(
      "imageSelecteds",
      filteredImages.map((image) => image.file) as any,
    );
    setImagesPreview(filteredImages);
  };

  const handlePreviewImg = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const images = Array.from(event.target.files!);
    const imagesWithUrl = images.map((file) => {
      return {
        url: URL.createObjectURL(file),
        file,
      };
    });
    setImagesPreview((prevState) => {
      const mergeImages = [...prevState, ...imagesWithUrl];
      formMethods.setValue(
        "imageSelecteds",
        mergeImages.map((image) => image.file) as any,
      );
      return mergeImages;
    });
  };

  const totalPrice: number = useMemo(
    () => calculateTotalPrice(String(price), Number(discountPercentage)),
    [price, discountPercentage],
  );

  const onSubmit = (data: ProductsSchemaType) => {
    const { imageSelecteds, ...restData } = data;
    const dataArrayWithoutImages = [];

    for (const [key, value] of Object.entries(restData)) {
      dataArrayWithoutImages.push({ key, value });
    }

    const formData = new FormData();
    dataArrayWithoutImages.forEach((field) => {
      formData.append(field.key, field.value);
    });

    imagesPreview.forEach((image) => {
      formData.append("imageSelecteds", image.file);
    });

    createProduct(formData);
  };

  useEffect(() => {
    formMethods.register("imageSelecteds");
  }, []);

  return (
    <Form {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col gap-8 "
      >
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
              multiple
              className="absolute inset-0"
              accept=".png, .jpg, .jpeg"
              onChange={handlePreviewImg}
              disabled={imagesPreview.length >= 4}
            />
            <Label
              htmlFor="productImages"
              className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center gap-2 bg-background text-base font-bold"
            >
              <ArrowUpFromLineIcon size={20} />
              Adicionar Imagem
            </Label>
          </div>

          <div className="flex flex-wrap justify-between gap-6">
            {imagesPreview?.map((image, index) => {
              return (
                <div
                  className="flex items-center justify-between gap-4"
                  key={index}
                >
                  <div className="relative aspect-square h-20 overflow-hidden rounded-md">
                    <Image
                      src={image.url}
                      alt={`Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => handleDeleteImage(image.file)}
                  >
                    <Trash className="h-[1em] w-[1em]" />
                  </Button>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-3">
            <Label className="font-bold">Categorias</Label>

            <FormField
              control={formMethods.control}
              name="category"
              render={({ field }) => (
                <FormControl>
                  <RadioGroup
                    {...field}
                    onValueChange={field.onChange}
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
