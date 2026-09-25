import Product from "@/components/Product";
import Sidebar from "@/components/Sidebar";

export default function Products() {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="flex items-stretch bg-dashbord w-[60%] rounded-lg shadow-2xl">
        <Sidebar />
        <div className="rightside w-[80%] py-2">
          <div className="flex items-center justify-around gap-2">
            <h1 className="text-2xl font-bold">Products:</h1>
            <div className="w-30 h-10 rounded-2xl bg-dashboardLink flex items-center justify-center">
              add Products
            </div>
          </div>
          <div className="flex items-center justify-center p-4">
            <Product />
          </div>
        </div>
      </div>
    </div>
  );
}
