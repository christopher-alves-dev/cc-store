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

export const uploadFile = async (form: File) => {
  const buffer = (await form.arrayBuffer()) as Buffer;

  const key = `uploaded-files/${form.name}`;

  const command = new PutObjectCommand({
    Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
    ACL: "public-read",
    Key: key,
    Body: buffer,
  });

  await s3Client.send(command);
};
