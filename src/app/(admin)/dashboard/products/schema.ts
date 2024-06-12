import z from "zod";

export const productsSchema = z
  .object({
    name: z
      .string({
        required_error: "Campo obrigatório",
      })
      .min(2, "Nome muito curto")
      .max(255, "Nome muito longo"),
    description: z
      .string({
        required_error: "Campo obrigatório",
      })
      .min(10, "Descrição muito curta"),
    price: z.coerce
      .string({
        required_error: "Campo obrigatório",
      })
      .min(1, "Campo obrigatório"),
    category: z
      .string({ required_error: "Escolha uma categoria" })
      .min(1, "Selecione uma categoria"),
    haveDiscount: z.coerce.boolean().optional(),
    discountPercentage: z.coerce
      .string({
        required_error: "Campo obrigatório",
      })
      .refine((value) => Number(value) >= 0 && Number(value) <= 100, {
        message: "Desconto inválido, 0% à 100%",
      }),
    imageSelecteds: z
      .custom<string[]>()
      .refine((files) => files?.length !== 0, "Selecione ao menos uma imagem"),
  })
  .superRefine((values, ctx) => {
    if (values.haveDiscount && !values.discountPercentage) {
      ctx.addIssue({
        message: "Campo obrigatório",
        code: z.ZodIssueCode.custom,
        path: ["discountPercentage"],
      });
    }
  });

export type ProductsSchemaType = z.infer<typeof productsSchema>;
