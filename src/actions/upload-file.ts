"use server";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "auto",
  endpoint: process.env.CLOUDFLARE_R2_BUCKET_URL,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
});

type UploadFileResponse = {
  success?: {
    message: string;
    url: string;
  };
  error?: {
    message: string;
  };
};

export const uploadFile = async (
  image: FormData,
): Promise<UploadFileResponse> => {
  const file = image.get("file") as File;
  const buffer = (await file.arrayBuffer()) as Buffer;
  const key = `uploaded-files/${file.name}`;

  const command = new PutObjectCommand({
    Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
    ACL: "public-read",
    Key: key,
    Body: buffer,
  });

  const { $metadata } = await s3Client.send(command);

  let fileUploadedUrl;
  if ($metadata.httpStatusCode !== 200) {
    return {
      error: {
        message: "Erro ao fazer upload da imagem",
      },
    };
  }

  fileUploadedUrl = `${process.env.CLOUDFLARE_R2_PUB_BUCKET_URL}/${process.env.CLOUDFLARE_R2_FOLDER_NAME}/${file.name}`;

  return {
    success: {
      message: "Upload realizado com sucesso",
      url: fileUploadedUrl,
    },
  };
};
