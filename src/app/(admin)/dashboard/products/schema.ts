import z from "zod";

export const productsSchema = z.object({
  name: z.string().min(2, "Nome muito curto").max(255, "Nome muito longo"),
  price: z.number().min(0.01, "Preço inválido"),
  category: z.string().min(1, "Categoria inválida"),
  productHaveDiscount: z.boolean(),
  discountPercentage: z
    .number()
    .min(0, "Desconto inválido")
    .max(100, "Desconto inválido"),
  // images: z.array(z.string().url()).min(1, "Imagem inválida"),
});

export type ProductsSchemaType = z.infer<typeof productsSchema>;
