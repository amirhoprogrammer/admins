import api from "./api";
import { productsDetail } from "@/utils/types";

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
