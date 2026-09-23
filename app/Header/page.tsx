import { isAuthenticated } from "@/services/login";
import React from "react";

export default function Header() {
  return (
    <div className="flex items-center justify-between">
      {isAuthenticated() && (
        <div>
          <p className="text-base">Authenticated</p>
          <button className="text-base">Log out</button>
        </div>
      )}
      {!isAuthenticated() && <p className="text-base">Not Authenticated</p>}
    </div>
  );
}
