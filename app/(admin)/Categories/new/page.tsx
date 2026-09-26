import CategoryForm from "@/components/CategoryForm";
import React from "react";
export default function NewCategory() {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="bg-dashbord w-[45%] rounded-lg p-4 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">افزودن دسته‌بندی جدید</h1>
        <CategoryForm />
      </div>
    </div>
  );
}
