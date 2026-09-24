"use client";
import { getCategory } from "@/services/category";
import { category } from "@/utils/types";
import React, { useEffect, useState } from "react";

export default function Category(id: number) {
  const [category, setCategory] = useState<category[] | null>(null);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    if (isNaN(id)) {
      setNotFound(true);
      return;
    }

    getCategory(id)
      .then((data) => {
        // بسته به این‌که API آرایه برمی‌گردونه یا یه آبجکت تنها:
        const result = Array.isArray(data) ? data[0] : data;
        console.log(result);
        //if (!result) {
        //  setNotFound(true);
        //} else {
        //  setCategory(result);
        //}
      })
      .catch((error) => {
        console.error("Error fetching category:", error);
        setNotFound(true);
      });
  }, []);

  return (
    <div className="flex bg-dashbord">
      <div>di</div>
    </div>
  );
}
