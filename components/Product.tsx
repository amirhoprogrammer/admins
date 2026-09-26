"use client";

import { deleteProducts, getProducts } from "@/services/products";
import { productsDetail } from "@/utils/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "./Modal";
import Link from "next/link";

export default function Product() {
  const [selectedProduct, setSelectedProduct] = useState<productsDetail | null>(
    null
  );
  const [products, setProducts] = useState<productsDetail[] | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]);
      });
  }, []);
  const handleDelete = async (productId: number) => {
    const confirmed = window.confirm(
      "آیا از حذف این محصول مطمئن هستید؟ این عمل قابل بازگشت نیست."
    );
    if (!confirmed) return;

    setDeletingId(productId);
    try {
      await deleteProducts(productId);
      // از state هم حذفش کن تا لیست بدون رفرش آپدیت بشه
      setProducts((prev) =>
        prev ? prev.filter((p) => p.id !== productId) : prev
      );
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("خطا در حذف محصول");
    } finally {
      setDeletingId(null);
    }
  };

  if (products === null) return null;
  return (
    <div className="p-2">
      {products.map((product, id) => (
        <div
          className="p-4 rounded-lg bg-product flex m-4 gap-6 items-center justify-between"
          key={product.id}
        >
          <div className="bg-productId rounded-2xl p-2">
            <p className="text-base">{id}</p>
          </div>
          <div className="relative w-16 h-16 shrink-0 rounded-lg overflow-hidden bg-gray-200">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name_en}
                fill
                className="object-cover"
                sizes="64px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                بدون عکس
              </div>
            )}
          </div>
          <div className="bg-text p-2 rounded-lg">
            <p className="text-base" dir="ltr">
              {product.name_en}
            </p>
            <p className="text-base" dir="rtl">
              {product.name_fa}
            </p>
          </div>
          <div className="bg-text p-2 rounded-lg">
            <p className="text-base" dir="ltr">
              {product.description_en.slice(0, 20) + "..."}
            </p>
            <p className="text-base" dir="rtl">
              {product.description_fa.slice(0, 20) + "..."}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => setSelectedProduct(product)}
              className="bg-details p-2 rounded-lg"
            >
              details
            </button>
            {/* فقط یک مودال بیرون از map */}
            <Modal
              isOpen={!!selectedProduct}
              onClose={() => setSelectedProduct(null)}
              title="Product Details"
            >
              {selectedProduct && (
                <div className="rounded-lg w-full flex flex-col overflow-hidden gap-5">
                  <div className="relative w-full h-80 shrink-0 rounded-lg overflow-hidden bg-gray-200">
                    {selectedProduct.image ? (
                      <Image
                        src={selectedProduct.image}
                        alt={selectedProduct.name_en}
                        fill
                        className="object-center"
                        sizes="(max-width: 768px) 100vw, 800px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        بدون عکس
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between p-2">
                    <h3 className="text-2xl font-bold">
                      {selectedProduct.name_en}
                    </h3>
                    <h3 className="text-2xl font-bold" dir="rtl">
                      {selectedProduct.name_fa}
                    </h3>
                  </div>

                  <div className="flex flex-col p-4 gap-3">
                    <p className="text-sm">{selectedProduct.description_en}</p>
                    <p className="text-sm" dir="rtl">
                      {selectedProduct.description_fa}
                    </p>
                  </div>
                </div>
              )}
            </Modal>
            <Link
              href={`/Products/${product.id}/edit`}
              className="bg-update p-2 rounded-lg"
            >
              update
            </Link>
            <button
              onClick={() => handleDelete(product.id!)}
              disabled={deletingId === product.id}
              className="bg-delete p-2 rounded-lg disabled:opacity-50"
            >
              {deletingId === product.id ? "در حال حذف..." : "delete"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
