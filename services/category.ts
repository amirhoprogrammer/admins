import { CreateCategoryPayload, category } from "@/utils/types";
import api from "./api";

export const createCategory = async (
  payload: CreateCategoryPayload
): Promise<category> => {
  const response = await api.post("/products/category/create/", payload);
  return response.data;
};

export const deleteCategory = async (category_id: number): Promise<void> => {
  await api.delete(`/products/category/delete/${category_id}/`);
};

export const getCategories = async (): Promise<category[]> => {
  const response = await api.get("/products/category/get/");
  return response.data;
};

export const getCategory = async (category_id: number): Promise<category[]> => {
  const response = await api.get(`/products/category/get/${category_id}/`);
  return response.data;
};

export const updateCategory = async (
  category_id: number,
  payload: CreateCategoryPayload
): Promise<category> => {
  const response = await api.put(
    `/products/category/update/${category_id}/`,
    payload
  );
  return response.data;
};
