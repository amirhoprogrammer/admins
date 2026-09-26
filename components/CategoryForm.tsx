"use client";

import { createCategory } from "@/services/category";
import { CreateCategoryPayload } from "@/utils/types";
import { useRouter } from "next/navigation";

import { FormEvent, useState } from "react";

export default function CategoryForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name_en: "",
    name_fa: "",
  });
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    setLoading(true);
    try {
      await createCategory({
        ...form,
      } as CreateCategoryPayload);

      router.push("/Categories");
    } catch (err) {
      console.error(err);
      setError("خطا در ثبت دسته بندی");
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
        {loading ? "در حال ثبت..." : "ثبت دسته بندی"}
      </button>
    </form>
  );
}
