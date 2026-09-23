"use client";

import Header from "../Header/page";
import { getCategories } from "@/services/category";
import { getProducts } from "@/services/products";
import { category, productsDetail } from "@/utils/types";
import { useEffect, useState } from "react";

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

  if (categories === null) return null;
  //if (categories.length === 0) {
  //  return <div className="text-red-500">there isn't any Categories</div>;
  //}

  if (products === null) return null;
  //if (products.length === 0) {
  //  return <div className="text-red-500">there isn't any Products</div>;
  //}

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center py-4">
        <div className="flex items-center justify-center bg-dashbord w-[60%] rounded-lg">
          <div className="leftside flex-col content-center border-r-2 w-[20%]">
            <div className="flex items-center justify-center p-4 border-b-2">
              Dashbord
            </div>
            <div className="flex items-center justify-center p-4 border-b-2">
              Categories
            </div>
            <div className="flex items-center justify-center p-4 border-b-2">
              Products
            </div>
          </div>
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
              <button className="flex items-center justify-center w-[70%] rounded-lg bg-dashboardLink">
                Categories
              </button>
            </div>
            <div className="flex items-center justify-center p-4">
              <button className="flex items-center justify-center w-[70%] rounded-lg bg-dashboardLink">
                Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
