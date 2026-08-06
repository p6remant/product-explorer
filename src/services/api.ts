import { apiClient, API_BASE_URL } from "@/lib/apiClient";
import {
  ProductsResponse,
  FetchProductsParams,
  Product,
  ProductCategory,
} from "@/types/product";

export const fetchCategoriesApi = async (): Promise<ProductCategory[]> => {
  const response = await apiClient.get<ProductCategory[] | string[]>(
    "/products/categories",
  );
  if (typeof response.data[0] === "string") {
    return (response.data as string[]).map((cat) => ({
      slug: cat,
      name: cat.replace("-", " ").toUpperCase(),
      url: `${API_BASE_URL}/products/category/${cat}`,
    }));
  }
  return response.data as ProductCategory[];
};

export const fetchProductsApi = async (
  params: FetchProductsParams,
): Promise<ProductsResponse> => {
  const { limit = 10, skip = 0, search = "", categories = [] } = params;

  const endpoint = search.trim() ? "/products/search" : "/products";

  const response = await apiClient.get<ProductsResponse>(endpoint, {
    params: {
      limit,
      skip,
      q: search.trim() || undefined,
      category: categories.length > 0 ? categories.join(",") : undefined,
    },
  });

  return response.data;
};

export const fetchProductByIdApi = async (id: string): Promise<Product> => {
  const response = await apiClient.get<Product>(`/products/${id}`);
  return response.data;
};
