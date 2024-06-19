import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string({
      required_error: "Campo obrigatório",
    })
    .min(2, "Nome muito curto")
    .max(255, "Nome muito longo"),
  image: z
    .string({
      required_error: "Imagem obrigatória",
    })
    .min(1, "Imagem obrigatória"),
});

export type CategorySchemaType = z.infer<typeof categorySchema>;
