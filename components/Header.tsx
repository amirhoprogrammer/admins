"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-toastify";

export default function Header() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("از اکانت خود با موفقیت خارج شدید");
    router.push("/Login");
  };

  return (
    <div className="flex items-center justify-between w-full p-5 shadow-lg">
      {isAuthenticated ? (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <p className="text-base">Authenticated</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-base bg-delete rounded-lg p-2"
          >
            Log out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-gray-400" />
          <p className="text-base">Not Authenticated</p>
        </div>
      )}
    </div>
  );
}
