"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/ImageUploader";
import { createProducts, updateProduct } from "@/services/products";
import { getCategories } from "@/services/category";
import { productsDetail, category, ProductFormProps } from "@/utils/types";
import { useEffect } from "react";

export default function ProductForm({
  productId,
  initialData,
}: ProductFormProps) {
  const router = useRouter();
  const isEditMode = !!productId;
  const [categories, setCategories] = useState<category[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(
    initialData?.image || null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    category:
      typeof initialData?.category === "object" &&
      initialData?.category !== null
        ? (initialData.category as any).id
        : initialData?.category ?? 0,
    name_en: initialData?.name_en ?? "",
    name_fa: initialData?.name_fa ?? "",
    description_en: initialData?.description_en ?? "",
    description_fa: initialData?.description_fa ?? "",
  });

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    setLoading(true);
    try {
      const payload = { ...form, image: imageUrl } as productsDetail;

      if (isEditMode) {
        await updateProduct(productId, payload);
      } else {
        await createProducts(payload);
      }
      router.push("/Products");
    } catch (err) {
      console.error(err);
      setError(isEditMode ? "خطا در ویرایش محصول" : "خطا در ثبت محصول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 max-w-lg w-full"
    >
      <div>
        <label className="mb-1 flex items-center justify-end">
          (اختیاری)عکس محصول
        </label>
        <ImageUploader onUploaded={setImageUrl} />
        {imageUrl && isEditMode && (
          <p className="text-xs text-gray-500 mt-1">
            عکس فعلی حفظ شده؛ برای تغییر، عکس جدید آپلود کنید
          </p>
        )}
      </div>

      <div>
        <label className="flex items-center justify-end mb-1">
          نام (English)
        </label>
        <input
          type="text"
          required
          value={form.name_en}
          onChange={(e) => setForm({ ...form, name_en: e.target.value })}
          className="w-full border-b-2 p-2"
        />
      </div>

      <div>
        <label className="flex items-center justify-end mb-1">
          نام (فارسی)
        </label>
        <input
          type="text"
          required
          value={form.name_fa}
          onChange={(e) => setForm({ ...form, name_fa: e.target.value })}
          className="w-full border-b-2 p-2"
          dir="rtl"
        />
      </div>

      <div>
        <label className="flex items-center justify-end mb-1">
          توضیحات (English)
        </label>
        <textarea
          required
          value={form.description_en}
          onChange={(e) => setForm({ ...form, description_en: e.target.value })}
          className="w-full border-b-2 p-2"
        />
      </div>

      <div>
        <label className="flex items-center justify-end mb-1">
          توضیحات (فارسی)
        </label>
        <textarea
          required
          value={form.description_fa}
          onChange={(e) => setForm({ ...form, description_fa: e.target.value })}
          className="w-full border-b-2 p-2"
          dir="rtl"
        />
      </div>

      <div>
        <label className="flex items-center justify-end mb-1">دسته‌بندی</label>
        <select
          required
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: Number(e.target.value) })
          }
          className="w-full border-b-2 p-2"
        >
          <option value={0} disabled>
            انتخاب کنید
          </option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name_fa}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-error">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-submit px-6 py-2 rounded disabled:opacity-50"
      >
        {loading ? "در حال ثبت..." : isEditMode ? "ویرایش محصول" : "ثبت محصول"}
      </button>
    </form>
  );
}
