"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";

interface ImageUploaderProps {
  onUploaded: (url: string) => void;
}

export default function ImageUploader({ onUploaded }: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("آپلود ناموفق بود");

      const data = await res.json();
      onUploaded(data.url);
    } catch (err) {
      console.error(err);
      setError("خطا در آپلود عکس");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {uploading && <p className="text-sm">در حال آپلود...</p>}
      {error && <p className="text-error text-sm">{error}</p>}
      {preview && !uploading && (
        <div className="relative w-32 h-32">
          <Image
            src={preview}
            alt="پیش‌نمایش"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}
    </div>
  );
}
