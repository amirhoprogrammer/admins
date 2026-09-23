"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { LoginPayload } from "@/utils/types";
import axios from "axios";
import { login } from "@/services/login";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginPayload>({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState<"success" | "error" | "">("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const data = await login(formData);
      localStorage.setItem("token", data.token);
      setStatus("success");
      router.push("/dashboard");
    } catch (error) {
      setStatus("error");
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.detail ||
            error.response?.data?.message ||
            "ایمیل یا رمز عبور اشتباه است"
        );
      } else {
        setError("خطای غیرمنتظره‌ای رخ داد");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="px-2 mb-2 mx-2 rounded-md py-2 bg-form w-[40%]"
    >
      <div className="py-2">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email"
          required
          className="w-full border-b-2 p-2"
        />
      </div>
      <div className="py-2">
        <label className="block mb-1 ">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="password"
          required
          className="w-full border-b-2 p-2"
        />
      </div>

      <div className="flex items-center justify-center py-2">
        <button
          type="submit"
          disabled={loading}
          className="text-foreground px-6 py-2 rounded disabled:opacity-50 bg-submit"
        >
          {loading ? "is sendeing..." : "send message"}
        </button>
      </div>

      {status === "success" && (
        <p className="text-command">send message seccessfully✓</p>
      )}
      {status === "error" && <p className="text-error">{error}</p>}
    </form>
  );
}
