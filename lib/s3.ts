import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  endpoint: process.env.ARVAN_S3_ENDPOINT,
  region: process.env.ARVAN_S3_REGION,
  credentials: {
    accessKeyId: process.env.ARVAN_S3_ACCESS_KEY!,
    secretAccessKey: process.env.ARVAN_S3_SECRET_KEY!,
  },
  forcePathStyle: true, // برای سرویس‌های S3-compatible مثل آروان لازمه
});

export const BUCKET_NAME = process.env.ARVAN_S3_BUCKET!;
