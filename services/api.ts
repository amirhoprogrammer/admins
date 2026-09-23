import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// قبل از هر درخواست، اگه توکن تو localStorage بود، تو هدر بذارش
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `${token}`;
      //config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// اگه توکن منقضی/نامعتبر بود (401)، کاربر رو به لاگین برگردون
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
