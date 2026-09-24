"use client";
import { getCategories, getCategory } from "@/services/category";
import { category } from "@/utils/types";
import React, { useEffect, useState } from "react";

export default function Category() {
  const [categories, setCategories] = useState<category[] | null>(null);

  useEffect(() => {
    getCategories()
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setCategories([]);
      });
  }, []);

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
            <button className="bg-details p-2 rounded-lg">details</button>
            <button className="bg-update p-2 rounded-lg">update</button>
            <button className="bg-delete p-2 rounded-lg">delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
