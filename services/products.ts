import api from "./api";
import { productsDetail } from "@/utils/types";

export const createProducts = async (
  item: productsDetail
): Promise<productsDetail> => {
  const response = await api.post("/products/create/", item);
  return response.data;
};

export const deleteProducts = async (product_id: number): Promise<void> => {
  await api.delete(`/products/delete/${product_id}/`);
};

export const getProducts = async (): Promise<productsDetail[]> => {
  const response = await api.get("/products/get/");
  return response.data;
};

export const getProduct = async (
  product_id: number
): Promise<productsDetail[]> => {
  const response = await api.get(`/products/get/${product_id}/`);
  return response.data;
};

export const updateProduct = async (
  product_id: number,
  item: productsDetail
): Promise<productsDetail> => {
  const response = await api.put(`/products/update/${product_id}/`, item);
  return response.data;
};
