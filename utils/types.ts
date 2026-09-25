export interface LoginPayload {
  email: string;
  password: string;
}
export interface LoginResponse {
  detail: string;
  token: string;
}
export interface productsDetail {
  categoryId: number;
  name_en: string;
  name_fa: string;
  description_en: string;
  description_fa: string;
  image: string | null;
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

export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  setToken: (token: string) => void;
  logout: () => void;
}
