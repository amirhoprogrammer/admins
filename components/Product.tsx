"use client";

import { getProducts } from "@/services/products";
import { productsDetail } from "@/utils/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "./Modal";

export default function Product() {
  const [selectedProduct, setSelectedProduct] = useState<productsDetail | null>(
    null
  );
  const [products, setProducts] = useState<productsDetail[] | null>(null);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]);
      });
  }, []);

  if (products === null) return null;
  return (
    <div className="p-2">
      {products.map((product, id) => (
        <div
          className="p-4 rounded-lg bg-product flex m-4 gap-6 items-center justify-between"
          key={id}
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
            <button className="bg-update p-2 rounded-lg">update</button>
            <button className="bg-delete p-2 rounded-lg">delete</button>
          </div>
        </div>
      ))}
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
    </div>
  );
}
