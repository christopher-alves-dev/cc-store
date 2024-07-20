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
import { ArrowUpFromLine } from "lucide-react";
import { ChangeEvent, useMemo, useState, useTransition } from "react";
import { FormInput } from "@/app/(admin)/components/form-input";
import { FormInputCurrency } from "../../components/form-input-currency";
import { SubmitButton } from "../../components/submit-button";
import { calculateTotalPrice } from "../../helpers/calculate-total-price";
import { createProduct } from "../actions/create-product";
import { useProductsForm } from "../hooks/useProductsForm";
import { ProductsSchemaType } from "../schema";

import { uploadFile } from "@/actions/upload-file";
import * as InputUpload from "@/app/(admin)/dashboard/components/input-upload";
import { toast } from "@/components/ui/use-toast";
import { normalizeFileName } from "@/helpers/normalize";
import { FormTextArea } from "../../components/form-text-area";
import { ImagePreview } from "../../components/image-preview";
import { updateProduct } from "../actions/update-product";

type Props = {
  categories: Pick<Category, "id" | "name">[];
  onCreateProduct?: (isOpen: boolean) => void;
};

export const ProductsForm = ({ categories, onCreateProduct }: Props) => {
  const [pending, startTransition] = useTransition();
  const { formMethods, productId } = useProductsForm();
  const [imagesPreview, setImagesPreview] = useState<string[]>(
    formMethods.getValues("imageSelecteds"),
  );

  const [price, discountPercentage, haveDiscount] = formMethods.watch([
    "price",
    "discountPercentage",
    "haveDiscount",
  ]);

  const handleDeleteImage = (imageToRemove: string) => {
    const filteredImages = imagesPreview.filter(
      (image) => image !== imageToRemove,
    );

    formMethods.setValue(
      "imageSelecteds",
      filteredImages.map((image) => image),
    );
    setImagesPreview(filteredImages);
  };

  const handleSelectImages = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    if (event.target.files.length > 4) {
      return toast({
        variant: "destructive",
        description:
          "Número máximo de imagens excedido. Selecione no máximo 4 imagens.",
      });
    }

    const selectedImages = Array.from(event.target.files);

    for (const [index, image] of selectedImages.entries()) {
      const formData = new FormData();
      formData.append("file", normalizeFileName(image));

      const imageObjectUrl = URL.createObjectURL(image);

      setImagesPreview((prevState) => {
        const mergeImages = [...prevState, imageObjectUrl];
        formMethods.setValue(
          "imageSelecteds",
          mergeImages.map((image) => image),
        );
        return mergeImages;
      });

      toast({
        title: "Upload",
        description: `Realizando upload ${index + 1} de ${selectedImages.length}`,
      });
      const response = await uploadFile(formData);

      if (response.error?.message) {
        toast({
          title: "Erro",
          variant: "destructive",
          description: `${response.error.message} ${index + 1}`,
        });

        setImagesPreview((prevState) => {
          const filteredImages = prevState.filter(
            (image) => image !== imageObjectUrl,
          );
          formMethods.setValue(
            "imageSelecteds",
            filteredImages.map((image) => image),
          );
          return filteredImages;
        });
      } else {
        setImagesPreview((prevState) => {
          const imageObjectUrlIndex = prevState.indexOf(imageObjectUrl);
          prevState[imageObjectUrlIndex] = response.success!.url;

          formMethods.setValue(
            "imageSelecteds",
            prevState.map((image) => image),
          );
          return prevState;
        });
      }
    }

    toast({
      title: "Sucesso",
      variant: "success",
      description: `Upload${selectedImages.length > 1 ? "s realizados com sucesso" : " realizado com sucesso"}`,
    });

    formMethods.trigger("imageSelecteds");
  };

  const totalPrice: number = useMemo(
    () => calculateTotalPrice(String(price), Number(discountPercentage)),
    [price, discountPercentage],
  );

  const onSubmit = async (data: ProductsSchemaType) => {
    startTransition(async () => {
      const result = productId
        ? await updateProduct({ ...data, id: productId })
        : await createProduct(data);

      if (result?.error) {
        toast({
          title: "Erro!",
          variant: "destructive",
          description: result.error.message,
        });
      } else {
        toast({
          title: "Sucesso!",
          variant: "success",
          description: result?.success.message,
        });
        onCreateProduct && onCreateProduct(false);
      }
    });
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
            <FormLabel className="text-base font-bold" htmlFor="productImages">
              Imagens do produto (máximo 4)
            </FormLabel>

            {imagesPreview.length < 4 && (
              <InputUpload.Root
                data-error={
                  !!formMethods.formState.errors.imageSelecteds?.message
                }
              >
                <InputUpload.Element
                  multiple
                  id="productImages"
                  onChange={handleSelectImages}
                />

                <InputUpload.Label htmlFor="productImages">
                  <ArrowUpFromLine size={20} />
                  Adicionar imagens
                </InputUpload.Label>
              </InputUpload.Root>
            )}

            {!!imagesPreview.length && (
              <div className="flex items-center gap-3">
                {imagesPreview.map((image) => (
                  <ImagePreview
                    key={image}
                    data={{ src: image }}
                    onRemoveImage={() => handleDeleteImage(image)}
                  />
                ))}
              </div>
            )}

            {formMethods.formState.errors.imageSelecteds && (
              <InputUpload.ErrorMessage>
                {formMethods.formState.errors.imageSelecteds.message}
              </InputUpload.ErrorMessage>
            )}
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
                          <RadioGroupItem value={category.id} />
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
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                <Label
                  htmlFor="discountPercentage"
                  className="text-base font-bold"
                >
                  Porcentagem de Desconto
                </Label>

                <FormInput
                  name="discountPercentage"
                  control={formMethods.control}
                  placeholder="0%"
                  unit="%"
                />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-base font-bold">Preço com Desconto</p>
                <p className="text-base font-normal">
                  {formatNumberToCurrency(totalPrice)}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="mt-auto flex flex-col gap-5">
          <SubmitButton pending={pending} label="Salvar" />
        </div>
      </form>
    </Form>
  );
};
