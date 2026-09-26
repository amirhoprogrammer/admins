"use client";

import { deleteProducts, getProducts } from "@/services/products";
import { productsDetail } from "@/utils/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "./Modal";
import Link from "next/link";
import { toast } from "react-toastify";

export default function Product() {
  const [selectedProduct, setSelectedProduct] = useState<productsDetail | null>(
    null
  );
  const [productToDelete, setProductToDelete] = useState<productsDetail | null>(
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
  const confirmDelete = async () => {
    if (!productToDelete) return;
    const productId = productToDelete.id!;

    setDeletingId(productId);
    setProductToDelete(null); // مودال تأیید رو ببند

    try {
      await deleteProducts(productId);
      setProducts((prev) =>
        prev ? prev.filter((p) => p.id !== productId) : prev
      );
      toast.success("محصول با موفقیت حذف شد");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("خطا در حذف محصول");
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

            <Link
              href={`/Products/${product.id}/edit`}
              className="bg-update p-2 rounded-lg"
            >
              update
            </Link>
            <button
              onClick={() => setProductToDelete(product)}
              disabled={deletingId === product.id}
              className="bg-delete p-2 rounded-lg disabled:opacity-50"
            >
              {deletingId === product.id ? "در حال حذف..." : "delete"}
            </button>
          </div>
        </div>
      ))}
      {/* فقط یک مودال بیرون از map */}
      <Modal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        title="جزبیات"
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
              <h3 className="text-2xl font-bold">{selectedProduct.name_en}</h3>
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
