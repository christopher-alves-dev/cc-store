import { uploadFile } from "@/actions/upload-file";
import { FormInput } from "@/app/(admin)/dashboard/components/form-input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { ArrowUpFromLine } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useState, useTransition } from "react";
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

  const handleSelectImage = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    setImagePreview(URL.createObjectURL(event.target.files[0]));

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
          {!imagePreview && (
            <div className="relative h-10 w-full overflow-hidden rounded-[0.625rem] border-2 border-gray-800 bg-background">
              <input
                type="file"
                className="invisible"
                id="image"
                onChange={handleSelectImage}
              />

              <label
                className="absolute inset-0 flex cursor-pointer items-center justify-center gap-2.5 text-base font-bold"
                htmlFor="image"
              >
                <ArrowUpFromLine size={20} />
                Adicionar imagem
              </label>
            </div>
          )}

          {!!imagePreview && (
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex h-[100px] cursor-pointer items-center justify-center rounded-lg lg:h-[77px] lg:w-[77px] lg:bg-black">
                  <Image
                    src={imagePreview}
                    alt={""}
                    height={0}
                    width={0}
                    sizes="100vw"
                    className="h-auto max-h-[70%] w-auto max-w-[80%]"
                  />
                </div>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader className="relative flex h-[400px] items-center justify-center">
                  <Image
                    src={imagePreview}
                    alt={""}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-auto max-h-[90%] w-full"
                  />
                </DialogHeader>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="mt-auto">
          <SubmitButton pending={pending} />
        </div>
      </form>
    </Form>
  );
};
