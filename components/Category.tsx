"use client";
import {
  deleteCategory,
  getCategories,
  getCategory,
} from "@/services/category";
import { category } from "@/utils/types";
import React, { useEffect, useState } from "react";

export default function Category() {
  const [categories, setCategories] = useState<category[] | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setCategories([]);
      });
  }, []);
  const handleDelete = async (productId: number) => {
    const confirmed = window.confirm(
      "آیا از حذف این محصول مطمئن هستید؟ این عمل قابل بازگشت نیست."
    );
    if (!confirmed) return;

    setDeletingId(productId);
    try {
      await deleteCategory(productId);
      // از state هم حذفش کن تا لیست بدون رفرش آپدیت بشه
      setCategories((prev) =>
        prev ? prev.filter((p) => p.id !== productId) : prev
      );
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("خطا در حذف محصول");
    } finally {
      setDeletingId(null);
    }
  };

  if (categories === null) return null; // یا یه اسکلتون لودینگ

  return (
    <div className="p-2">
      {categories.map((category, id) => (
        <div
          className="p-4 rounded-lg bg-category flex m-4 gap-2 items-center justify-between"
          key={id}
        >
          <div className="bg-categoryId rounded-2xl p-2">
            <p className="text-base">{category.id}</p>
          </div>
          <div className="">
            <p className="text-base">{category.name_en}</p>
          </div>
          <div className="">
            <p className="text-base">{category.name_fa}</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <button className="bg-update p-2 rounded-lg">update</button>
            <button
              onClick={() => handleDelete(category.id!)}
              disabled={deletingId === category.id}
              className="bg-delete p-2 rounded-lg disabled:opacity-50"
            >
              {deletingId === category.id ? "در حال حذف..." : "delete"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
