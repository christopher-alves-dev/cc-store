import z from "zod";

const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpg", "image/jpeg"];
const MAX_IMAGE_SIZE = 4; //In MegaBytes

const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024);
  return +result.toFixed(decimalsNum);
};

export const productsSchema = z.object({
  name: z
    .string({
      required_error: "Nome obrigatório",
    })
    .min(2, "Nome muito curto")
    .max(255, "Nome muito longo"),
  price: z.coerce
    .string({
      required_error: "Campo obrigatório",
    })
    .min(1, "Campo obrigatório"),
  category: z.any().optional(),
  haveDiscount: z.coerce.boolean().optional(),
  discountPercentage: z.coerce
    .number()
    .min(0, "Desconto inválido")
    .max(100, "Desconto inválido"),
  imageSelecteds: z
    .custom<File[]>()
    .refine((files) => {
      return files?.length !== 0;
    }, "Selecione ao menos uma imagem")
    .refine((files) => {
      return Array.from(files ?? []).every(
        (file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE,
      );
    }, `The maximum image size is ${MAX_IMAGE_SIZE}MB`)
    .refine((files) => {
      return Array.from(files ?? []).every((file) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type),
      );
    }, "File type is not supported"),
});

export type ProductsSchemaType = z.infer<typeof productsSchema>;
