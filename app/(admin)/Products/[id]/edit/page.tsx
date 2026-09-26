"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProduct } from "@/services/products";
import { productsDetail } from "@/utils/types";
import ProductForm from "@/components/ProductForm";

export default function EditProduct() {
  const params = useParams();
  const [product, setProduct] = useState<productsDetail | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const id = Number(params.id);
    if (isNaN(id)) {
      setNotFound(true);
      return;
    }

    getProduct(id)
      .then((data) => {
        const result = Array.isArray(data) ? data[0] : data;
        if (!result) setNotFound(true);
        else setProduct(result);
      })
      .catch((err) => {
        console.error(err);
        setNotFound(true);
      });
  }, [params.id]);

  if (notFound) {
    return (
      <div className="flex items-center justify-center py-10">
        <p className="text-red-500">محصول یافت نشد</p>
      </div>
    );
  }

  if (!product) {
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
        <ProductForm productId={product.id} initialData={product} />
      </div>
    </div>
  );
}
