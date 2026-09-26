"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductForm from "@/components/ProductForm";
import { getCategory } from "@/services/category";
import { category } from "@/utils/types";
import CategoryForm from "@/components/CategoryForm";

export default function EditCategory() {
  const params = useParams();
  const [category, setCategory] = useState<category | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const id = Number(params.id);
    if (isNaN(id)) {
      setNotFound(true);
      return;
    }

    getCategory(id)
      .then((data) => {
        const result = Array.isArray(data) ? data[0] : data;
        if (!result) setNotFound(true);
        else setCategory(result);
      })
      .catch((err) => {
        console.error(err);
        setNotFound(true);
      });
  }, [params.id]);

  if (notFound) {
    return (
      <div className="flex items-center justify-center py-10">
        <p className="text-red-500">دسته بندی یافت نشد</p>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex items-center justify-center py-10">
        <p>در حال بارگذاری...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-4">
      <div className="bg-dashbord w-[60%] rounded-lg p-4">
        <h1 className="text-2xl font-bold mb-4">ویرایش محصول</h1>
        <CategoryForm categoryId={category.id} initialData={category} />
      </div>
    </div>
  );
}
