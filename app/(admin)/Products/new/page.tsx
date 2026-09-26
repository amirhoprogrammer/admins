// app/(admin)/Products/new/page.tsx
import ProductForm from "@/components/ProductForm";

export default function NewProduct() {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="bg-dashbord w-[45%] rounded-lg p-4 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">افزودن محصول جدید</h1>
        <ProductForm />
      </div>
    </div>
  );
}
