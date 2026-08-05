import axios from "axios";
import {
  ProductsResponse,
  FetchProductsParams,
  Product,
} from "@/types/product";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchProductsApi = async (
  params: FetchProductsParams,
): Promise<ProductsResponse> => {
  const { limit = 10, skip = 0, search = "" } = params;
  const endpoint = search.trim() ? "/products/search" : "/products";

  const response = await apiClient.get<ProductsResponse>(endpoint, {
    params: {
      limit,
      skip,
      q: search.trim() || undefined,
    },
  });

  return response.data;
};

export const fetchProductByIdApi = async (id: string): Promise<Product> => {
  const response = await apiClient.get<Product>(`/products/${id}`);
  return response.data;
};
