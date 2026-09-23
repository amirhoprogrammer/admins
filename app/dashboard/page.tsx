import React from "react";
import Header from "../Header/page";

export default function dashboard() {
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center">
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
            <div></div>
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
