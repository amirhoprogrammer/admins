"use client";

import { createCategory, updateCategory } from "@/services/category";
import { CategoryFormProps, CreateCategoryPayload } from "@/utils/types";
import { useRouter } from "next/navigation";

import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

export default function CategoryForm({
  categoryId,
  initialData,
}: CategoryFormProps) {
  const router = useRouter();
  const isEditMode = !!categoryId;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name_en: initialData?.name_en ?? "",
    name_fa: initialData?.name_fa ?? "",
  });
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const payload = { ...form } as CreateCategoryPayload;
      if (isEditMode) {
        updateCategory(categoryId, payload);
        toast.success("دسته بندی با موفقیت ویرایش شد");
      } else {
        await createCategory(payload);
        toast.success("دسته بندی جدید با موفقیت اضافه شد");
      }
      router.push("/Categories");
    } catch (err) {
      console.error(err);
      setError(isEditMode ? "خطا در ثبت دسته بندی" : "خطا در ویرایش دسته بندی");
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
      {error && <p className="text-error">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="bg-submit px-6 py-2 rounded disabled:opacity-50"
      >
        {loading
          ? "در حال ثبت..."
          : isEditMode
          ? "ویرایش دسته بندی"
          : "ثبت دسته بندی"}
      </button>
    </form>
  );
}
