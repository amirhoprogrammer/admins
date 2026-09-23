"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/services/login";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/Login");
    } else {
      setChecked(true);
    }
  }, [router]);

  if (!checked) return null; // یا یه لودینگ اسپینر

  return <>{children}</>;
}
