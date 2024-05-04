"use server";

import { uploadFile } from "@/actions/upload-file";

export const createProduct = async (form: FormData) => {
  const images = form.getAll("imageSelecteds") as File[];

  const rawFormData = Object.fromEntries(form.entries());

  const uploadUrlsArray: string[] = [];

  for (const image of images) {
    const result = await uploadFile(image);

    if (result) {
      uploadUrlsArray.push(result);
    }
  }
};
