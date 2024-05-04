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

export const uploadFile = async (file: File): Promise<string | undefined> => {
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
    return fileUploadedUrl;
  }
  fileUploadedUrl = `${process.env.CLOUDFLARE_R2_PUB_BUCKET_URL}/${process.env.CLOUDFLARE_R2_FOLDER_NAME}/${file.name}`;

  return fileUploadedUrl;
};
