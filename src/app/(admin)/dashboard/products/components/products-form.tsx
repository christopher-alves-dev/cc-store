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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatNumberToCurrency } from "@/helpers/format-number-to-currency";
import { Category } from "@prisma/client";
import { Plus } from "lucide-react";
import { ChangeEvent, useMemo, useState } from "react";
import { DeleteButton } from "../../components/delete-button";
import { FormInput } from "../../components/form-input";
import { FormInputCurrency } from "../../components/form-input-currency";
import { SubmitButton } from "../../components/submit-button";
import { calculateTotalPrice } from "../../helpers/calculate-total-price";
import { createProduct } from "../actions/create-product";
import { useProductsForm } from "../hooks/useProductsForm";
import { ProductsSchemaType } from "../schema";

import * as InputUpload from "@/app/(admin)/dashboard/components/input-upload";
import { normalizeFileName } from "@/helpers/normalize-file-name";

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
  const inputRef = formMethods.register("imageSelecteds");

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
      const renamedFile = normalizeFileName(file);
      return {
        url: URL.createObjectURL(file),
        file: renamedFile,
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

          <div className="flex flex-col gap-3">
            <FormTextArea
              name="description"
              control={formMethods.control}
              label="Descrição"
              placeholder="Descrição do produto"
            />
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <InputUpload.Label htmlFor="productImages">
                Imagens do produto (máximo 4)
              </InputUpload.Label>
            </div>
            <InputUpload.Root className="flex flex-wrap gap-4">
              <InputUpload.Content className="flex flex-wrap gap-4">
                {imagesPreview.map((image) => (
                  <InputUpload.Preview
                    key={image.file.name}
                    data={image}
                    onRemove={() => handleDeleteImage(image.file)}
                  />
                ))}

                {imagesPreview.length < 4 && (
                  <InputUpload.TriggerWrapper>
                    <InputUpload.Trigger
                      {...inputRef}
                      multiple
                      id="productImages"
                      accept=".png, .jpg, .jpeg"
                      onChange={handlePreviewImg}
                      disabled={imagesPreview?.length >= 4}
                    />
                    <InputUpload.Label
                      htmlFor="productImages"
                      className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center gap-2 rounded-md bg-background"
                    >
                      <Plus size={24} />
                    </InputUpload.Label>
                  </InputUpload.TriggerWrapper>
                )}
              </InputUpload.Content>

              {formMethods.formState.errors.imageSelecteds && (
                <InputUpload.ErrorMessage>testeeee</InputUpload.ErrorMessage>
              )}
            </InputUpload.Root>
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
