"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/Login");
  };

  return (
    <div className="flex items-center justify-between w-full p-5 shadow-lg">
      {isAuthenticated ? (
        <div className="flex items-center justify-between w-full">
          <p className="text-base">Authenticated</p>
          <button
            onClick={handleLogout}
            className="text-base bg-delete rounded-lg p-2"
          >
            Log out
          </button>
        </div>
      ) : (
        <p className="text-base">Not Authenticated</p>
      )}
    </div>
  );
}
