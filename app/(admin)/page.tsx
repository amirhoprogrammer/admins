"use client";
//app/(admin)
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategories } from "@/services/category";
import { getProducts } from "@/services/products";
import { category, productsDetail } from "@/utils/types";
import Sidebar from "@/components/Sidebar";

export default function Dashboard() {
  const [categories, setCategories] = useState<category[] | null>(null);
  const [products, setProducts] = useState<productsDetail[] | null>(null);

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setCategories([]);
      });
  }, []);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(Array.isArray(data) ? data : []))
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]);
      });
  }, []);

  if (categories === null || products === null) return null;

  return (
    <div className="flex items-center justify-center py-4">
      <div className="flex items-stretch bg-dashbord w-[75%] rounded-lg shadow-2xl">
        <Sidebar />
        <div className="rightside w-[80%]">
          <div className="flex items-center justify-around ">
            <div className="flex items-center justify-center gap-2">
              <h3 className="text-lg">Categories:</h3>
              <div className="w-10 h-10 rounded-2xl bg-dashboardLink flex items-center justify-center">
                {categories.length}
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <h3 className="text-lg">Products:</h3>
              <div className="w-10 h-10 rounded-2xl bg-dashboardLink flex items-center justify-center">
                {products.length}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center p-4">
            <Link
              className="flex items-center justify-center w-[70%] rounded-lg bg-dashboardLink"
              href="/Categories"
            >
              Categories
            </Link>
          </div>
          <div className="flex items-center justify-center p-4">
            <Link
              className="flex items-center justify-center w-[70%] rounded-lg bg-dashboardLink"
              href="/Products"
            >
              Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
