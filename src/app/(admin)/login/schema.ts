import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Campo obrigatório",
    })
    .email("Email inválido"),
  password: z
    .string({
      required_error: "Campo obrigatório",
    })
    .min(6, "Mínimo 6 caracteres"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
