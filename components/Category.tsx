"use client";
import {
  deleteCategory,
  getCategories,
  getCategory,
} from "@/services/category";
import { category } from "@/utils/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "./Modal";

export default function Category() {
  const [categories, setCategories] = useState<category[] | null>(null);
  const [productToDelete, setProductToDelete] = useState<category | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setCategories([]);
      });
  }, []);
  const confirmDelete = async () => {
    if (!productToDelete) return;
    const productId = productToDelete.id!;

    setDeletingId(productId);
    setProductToDelete(null); // مودال تأیید رو ببند

    try {
      await deleteCategory(productId);
      setCategories((prev) =>
        prev ? prev.filter((p) => p.id !== productId) : prev
      );
      toast.success("دسته بندی با موفقیت حذف شد");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("خطا در حذف دسته بندی");
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
            <Link
              href={`/Categories/${category.id}/edit`}
              className="bg-update p-2 rounded-lg"
            >
              update
            </Link>
            <button
              onClick={() => setProductToDelete(category)}
              disabled={deletingId === category.id}
              className="bg-delete p-2 rounded-lg disabled:opacity-50"
            >
              {deletingId === category.id ? "در حال حذف..." : "delete"}
            </button>
          </div>
        </div>
      ))}
      <Modal
        isOpen={!!productToDelete}
        onClose={() => setProductToDelete(null)}
        title="تأیید حذف"
      >
        {productToDelete && (
          <div className="flex flex-col gap-6">
            <p className="text-base text-center">
              آیا از حذف محصول «{productToDelete.name_fa}» مطمئن هستید؟
              <br />
              <span className="text-sm text-back">
                این عمل قابل بازگشت نیست.
              </span>
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setProductToDelete(null)}
                className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                انصراف
              </button>
              <button
                onClick={confirmDelete}
                className="px-6 py-2 rounded-lg bg-delete text-white hover:bg-red-800"
              >
                بله، حذف کن
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
