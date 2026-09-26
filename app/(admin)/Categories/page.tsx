import Category from "@/components/Category";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import React from "react";
export default function Categories() {
  return (
    <div className="flex items-center justify-center py-4">
      <div className="flex items-stretch bg-dashbord w-[75%] rounded-lg shadow-2xl">
        <Sidebar />
        <div className="rightside w-[80%] py-2">
          <div className="flex items-center justify-around gap-2">
            <h1 className="text-2xl font-bold">Categories:</h1>
            <Link
              href="/Categories/new"
              className="w-30 h-10 rounded-2xl bg-dashboardLink flex items-center justify-center"
            >
              add Categories
            </Link>
          </div>
          <div className="flex items-center justify-center p-4">
            <Category />
          </div>
        </div>
      </div>
    </div>
  );
}
