import { uploadFile } from "@/actions/upload-file";
import { FormInput } from "@/app/(admin)/dashboard/components/form-input";
import * as InputUpload from "@/app/(admin)/dashboard/components/input-upload";
import { Form, FormLabel } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { ArrowUpFromLine } from "lucide-react";
import { ChangeEvent, useState, useTransition } from "react";
import { ImagePreview } from "../../components/image-preview";
import { SubmitButton } from "../../components/submit-button";
import { createCategory } from "../actions/create-category";
import { updateCategory } from "../actions/update-category";
import { useCategoryForm } from "../hooks/use-category-form";
import { CategorySchemaType } from "../schema";

type Props = {
  onCreateCategory?: (isOpen: boolean) => void;
};

export const CategoryForm = ({ onCreateCategory }: Props) => {
  const [pending, startTransition] = useTransition();
  const { formMethods, categoryId } = useCategoryForm();
  const [imagePreview, setImagePreview] = useState(
    formMethods.getValues("image"),
  );

  console.log({ errors: formMethods.formState.errors });

  const handleSelectImage = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    const imageObjectUrl = URL.createObjectURL(event.target.files[0]);

    setImagePreview(imageObjectUrl);
    formMethods.setValue("image", imageObjectUrl);
    formMethods.trigger("image");

    toast({
      title: "Upload",
      description: "Realizando upload da imagem de categoria",
    });

    const response = await uploadFile(formData);

    if (response.error?.message) {
      toast({
        title: "Erro!",
        variant: "destructive",
        description: response.error.message,
      });
      setImagePreview("");
      formMethods.setValue("image", "");
    } else {
      setImagePreview(response.success!.url);

      toast({
        title: "Sucesso!",
        variant: "success",
        description: response.success!.message,
      });

      formMethods.setValue("image", response.success!.url);
      formMethods.trigger("image");
    }
  };

  const handleRemoveImage = () => {
    setImagePreview("");
    formMethods.setValue("image", "");
  };

  const onSubmit = (data: CategorySchemaType) => {
    startTransition(async () => {
      const result = categoryId
        ? await updateCategory({ ...data, id: categoryId })
        : await createCategory(data);

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
      }
      onCreateCategory && onCreateCategory(false);
    });
  };

  return (
    <Form {...formMethods}>
      <form
        className="flex flex-1 flex-col gap-8"
        onSubmit={formMethods.handleSubmit(onSubmit)}
      >
        <FormInput
          name="name"
          label="Nome"
          control={formMethods.control}
          placeholder="Nome"
        />

        <div className="flex flex-col gap-3">
          <FormLabel className="text-base font-bold" htmlFor="image">
            Imagem da categoria
          </FormLabel>
          {!imagePreview && (
            <InputUpload.Root
              data-error={!!formMethods.formState.errors.image?.message}
            >
              <InputUpload.Element id="image" onChange={handleSelectImage} />

              <InputUpload.Label htmlFor="image">
                <ArrowUpFromLine size={20} />
                Adicionar imagem
              </InputUpload.Label>
            </InputUpload.Root>
          )}
          {formMethods.formState.errors.image && (
            <InputUpload.ErrorMessage>
              {formMethods.formState.errors.image.message}
            </InputUpload.ErrorMessage>
          )}

          {!!imagePreview && (
            <ImagePreview
              data={{ src: imagePreview }}
              onRemoveImage={handleRemoveImage}
            />
          )}
        </div>

        <div className="mt-auto">
          <SubmitButton pending={pending} label="Salvar" />
        </div>
      </form>
    </Form>
  );
};
