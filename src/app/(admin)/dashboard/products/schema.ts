import z from "zod";

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
  category: z
    .string({ required_error: "Escolha uma categoria" })
    .min(1, "Categoria inválida"),
  productHaveDiscount: z.boolean(),
  discountPercentage: z.coerce
    .number()
    .min(0, "Desconto inválido")
    .max(100, "Desconto inválido"),
  // images: z.array(z.string().url()).min(1, "Imagem inválida"),
  images: z.any().optional(),
});

export type ProductsSchemaType = z.infer<typeof productsSchema>;
