"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/ImageUploader";
import { createProducts } from "@/services/products";
import { getCategories } from "@/services/category";
import { productsDetail, category } from "@/utils/types";
import { useEffect } from "react";

export default function ProductForm() {
  const router = useRouter();
  const [categories, setCategories] = useState<category[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    categoryId: 0,
    name_en: "",
    name_fa: "",
    description_en: "",
    description_fa: "",
  });

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    //if (!imageUrl) {
    //  setError("لطفاً ابتدا عکس محصول را آپلود کنید");
    //  return;
    //}

    setLoading(true);
    try {
      await createProducts({
        ...form,
        image: imageUrl,
      } as productsDetail);

      router.push("/Products");
    } catch (err) {
      console.error(err);
      setError("خطا در ثبت محصول");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 max-w-lg">
      <div>
        <label className="block mb-1">(اختیاری)عکس محصول</label>
        <ImageUploader onUploaded={setImageUrl} />
      </div>

      <div>
        <label className="block mb-1">نام (English)</label>
        <input
          type="text"
          required
          value={form.name_en}
          onChange={(e) => setForm({ ...form, name_en: e.target.value })}
          className="w-full border-b-2 p-2"
        />
      </div>

      <div>
        <label className="block mb-1">نام (فارسی)</label>
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
        <label className="block mb-1">توضیحات (English)</label>
        <textarea
          required
          value={form.description_en}
          onChange={(e) => setForm({ ...form, description_en: e.target.value })}
          className="w-full border-b-2 p-2"
        />
      </div>

      <div>
        <label className="block mb-1">توضیحات (فارسی)</label>
        <textarea
          required
          value={form.description_fa}
          onChange={(e) => setForm({ ...form, description_fa: e.target.value })}
          className="w-full border-b-2 p-2"
          dir="rtl"
        />
      </div>

      <div>
        <label className="block mb-1">دسته‌بندی</label>
        <select
          required
          value={form.categoryId}
          onChange={(e) =>
            setForm({ ...form, categoryId: Number(e.target.value) })
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
        {loading ? "در حال ثبت..." : "ثبت محصول"}
      </button>
    </form>
  );
}
