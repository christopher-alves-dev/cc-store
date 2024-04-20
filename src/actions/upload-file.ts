"use server";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: "auto",
  endpoint: process.env.CLOUDFLARE_R2_BUCKET_URL,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY,
  },
});

const uploadFileToS3 = async (file, fileName) => {
  const fileBuffer = file;

  const params = {};
};

export const uploadFile = async (formData: any) => {
  try {
    console.log({ formData: formData });
    const file = formData.get("file");
    console.log({ file });

    const preSignedUrl = await getSignedUrl(
      s3Client,
      new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME,
        Key: file.name,
        ContentType: "image/png",
        ACL: "public-read",
      }),
      {
        expiresIn: 3600,
      },
    );

    console.log({ preSignedUrl });

    return {
      url: preSignedUrl,
    };
    // if (file?.size === 0) {
    //   return { status: "error", message: "Falha ao fazer upload das imagens" };
    // }

    // const buffer = Buffer.from(await file.arrayBuffer())
    // await uploadFileToS3(buffer, file.name);
  } catch (error) {}
  // const formData = new FormData();
  // formData.append("file", file);

  // const response = await fetch("/api/upload-file", {
  //   method: "POST",
  //   body: formData,
  // });

  // const data = await response.json();

  // return data;
};
