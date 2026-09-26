export interface LoginPayload {
  email: string;
  password: string;
}
export interface LoginResponse {
  detail: string;
  token: string;
}
export interface productsDetail {
  id?: number; // این خط اضافه شد
  category: number;
  name_en: string;
  name_fa: string;
  description_en: string;
  description_fa: string;
  image: string | null;
}

export interface ProductFormProps {
  productId?: number;
  initialData?: productsDetail;
}

export interface category {
  id: number;
  name_en: string;
  name_fa: string;
  created: string;
}
export interface CreateCategoryPayload {
  name_en: string;
  name_fa: string;
}

export interface CategoryFormProps {
  categoryId?: number; // اگه پر باشه یعنی حالت Edit
  initialData?: category; // اطلاعات اولیه برای پر کردن فرم
}
export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  setToken: (token: string) => void;
  logout: () => void;
}
