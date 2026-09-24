import Product from "@/components/Product";

export default function Products() {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="flex items-center justify-center bg-dashbord w-[60%] rounded-lg shadow-2xl">
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
