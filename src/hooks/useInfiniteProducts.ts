import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProductsApi } from "@/services/api";
import { PAGE_SIZE, STALE_TIME } from "@/lib/constants";
import type { ProductsResponse } from "@/types/product";

export const useInfiniteProducts = (
  searchQuery: string = "",
  categories: string[] = [],
  initialPage?: ProductsResponse,
) => {
  const isDefaultState = !searchQuery.trim() && categories.length === 0;

  const queryInfo = useInfiniteQuery({
    queryKey: ["products", "infinite", searchQuery.trim(), categories],
    queryFn: ({ pageParam = 0 }) =>
      fetchProductsApi({
        limit: PAGE_SIZE,
        skip: pageParam as number,
        search: searchQuery,
        categories,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
    staleTime: STALE_TIME,
    initialData:
      initialPage && isDefaultState
        ? { pages: [initialPage], pageParams: [0] }
        : undefined,
  });

  const products = useMemo(
    () => queryInfo.data?.pages.flatMap((page) => page.products) ?? [],
    [queryInfo.data?.pages],
  );

  return {
    ...queryInfo,
    products,
  };
};
