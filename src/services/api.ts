import { apiClient, API_BASE_URL } from "@/lib/apiClient";
import type {
  ProductsResponse,
  FetchProductsParams,
  Product,
  ProductCategory,
} from "@/types/product";

function paginateProducts(
  products: Product[],
  skip: number,
  limit: number,
): ProductsResponse {
  return {
    products: products.slice(skip, skip + limit),
    total: products.length,
    skip,
    limit,
  };
}

function normalizeCategories(
  data: ProductCategory[] | string[],
): ProductCategory[] {
  return data.map((cat) => {
    if (typeof cat === "string") {
      return {
        slug: cat,
        name: cat.replace(/-/g, " ").toUpperCase(),
        url: `${API_BASE_URL}/products/category/${cat}`,
      };
    }
    return cat;
  });
}

export const fetchCategoriesApi = async (): Promise<ProductCategory[]> => {
  const { data } = await apiClient.get<ProductCategory[] | string[]>(
    "/products/categories",
  );
  return normalizeCategories(data);
};

export const fetchProductsApi = async (
  params: FetchProductsParams,
): Promise<ProductsResponse> => {
  const { limit = 10, skip = 0, search = "", categories = [] } = params;
  const trimmedSearch = search.trim();
  const hasSearch = trimmedSearch.length > 0;
  const hasCategories = categories.length > 0;

  if (!hasSearch && !hasCategories) {
    const { data } = await apiClient.get<ProductsResponse>("/products", {
      params: { limit, skip },
    });
    return data;
  }

  if (!hasSearch && categories.length === 1) {
    const { data } = await apiClient.get<ProductsResponse>(
      `/products/category/${categories[0]}`,
      { params: { limit, skip } },
    );
    return data;
  }

  let products: Product[] = [];

  if (hasSearch) {
    const { data } = await apiClient.get<ProductsResponse>("/products/search", {
      params: { q: trimmedSearch, limit: 0 },
    });

    products = data.products;

    if (hasCategories) {
      const categorySet = new Set(categories);
      products = products.filter((product) =>
        categorySet.has(product.category),
      );
    }
  } else {
    const responses = await Promise.all(
      categories.map((category) =>
        apiClient.get<ProductsResponse>(`/products/category/${category}`, {
          params: { limit: 0 },
        }),
      ),
    );

    const productMap = new Map<number, Product>();
    for (const res of responses) {
      for (const item of res.data.products) {
        productMap.set(item.id, item);
      }
    }

    products = Array.from(productMap.values()).sort((a, b) => a.id - b.id);
  }

  return paginateProducts(products, skip, limit);
};

export const fetchProductByIdApi = async (
  id: string | number,
): Promise<Product> => {
  const { data } = await apiClient.get<Product>(`/products/${id}`);
  return data;
};
