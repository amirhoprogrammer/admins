"use client";

import { getProducts } from "@/services/products";
import { productsDetail } from "@/utils/types";
import { useEffect, useState } from "react";

export default function Product() {
  const [products, setProducts] = useState<productsDetail[] | null>(null);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]);
      });
  }, []);

  if (products === null) return null; // یا یه اسکلتون لودینگ
  return (
    <div className="p-2">
      {products.map((product, id) => (
        <div
          className="p-4 rounded-lg bg-product flex m-4 gap-2 items-center justify-between"
          key={id}
        >
          <div className="bg-productId rounded-2xl p-2">
            <p className="text-base">{id}</p>
          </div>
          <div className="">
            <p className="text-base" dir="ltr">
              {product.name_en}
            </p>
            <p className="text-base" dir="rtl">
              {product.name_fa}
            </p>
          </div>
          <div className="">
            <p className="text-base" dir="ltr">
              {product.description_en.slice(0, 20) + "..."}
            </p>
            <p className="text-base" dir="rtl">
              {product.description_fa.slice(0, 20) + "..."}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <button className="bg-details p-2 rounded-lg">details</button>
            <button className="bg-update p-2 rounded-lg">update</button>
            <button className="bg-delete p-2 rounded-lg">delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
