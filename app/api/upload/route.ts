import { NextRequest, NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client, BUCKET_NAME } from "@/lib/s3";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "فایلی ارسال نشده" }, { status: 400 });
    }

    // یه اسم یکتا برای فایل بساز تا فایل‌ها همدیگه رو رونویسی نکنن
    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: buffer,
        ContentType: file.type,
        //ACL: "public-read", // تا لینک مستقیم قابل نمایش باشه
      })
    );

    const publicUrl = `${process.env.ARVAN_S3_ENDPOINT}/${BUCKET_NAME}/${fileName}`;

    return NextResponse.json({ url: publicUrl }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "خطا در آپلود فایل" }, { status: 500 });
  }
}
