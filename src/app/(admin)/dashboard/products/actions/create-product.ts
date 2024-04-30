"use server";

import { uploadFile } from "@/actions/upload-file";
import { productsSchema } from "../schema";

export const createProduct = async (form: FormData) => {
  const images = form.getAll("imageSelecteds") as File[];
  const rawFormData = Object.fromEntries(form.entries());

  const formValidated = productsSchema.safeParse(rawFormData);

  if (formValidated.success) {
    images.forEach(async (image) => {
      await uploadFile(image);
    });
  }
};
