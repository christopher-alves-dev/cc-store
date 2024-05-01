"use server";

import { uploadFile } from "@/actions/upload-file";
import { productsSchema } from "../schema";

export const createProduct = async (form: FormData) => {
  const images = form.getAll("imageSelecteds") as File[];

  const rawFormData = Object.fromEntries(form.entries());

  // const validationResult = productsSchema.safeParse({
  //   ...rawFormData,
  //   imageSelecteds: images,
  // });

  // console.log({ images, rawFormData });

  // console.log({
  //   images,
  //   rawFormData,
  //   validationResult,
  //   error: validationResult.error,
  // });

  // if (validationResult.success) {
  //   console.log({ result: validationResult.data})
  // }

  // if (validationResult.error) {

  // }
  // if (formValidated.success) {
  images.forEach(async (image) => {
    await uploadFile(image);
  });
  // }
};
