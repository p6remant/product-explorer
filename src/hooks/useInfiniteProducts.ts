import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProductsApi } from "@/services/api";
import { PAGE_SIZE, STALE_TIME } from "@/lib/constants";

export const useInfiniteProducts = (
  searchQuery: string,
  categories: string[] = [],
) => {
  const queryInfo = useInfiniteQuery({
    queryKey: ["products", "infinite", searchQuery, categories],
    queryFn: ({ pageParam = 0 }) =>
      fetchProductsApi({
        limit: PAGE_SIZE,
        skip: pageParam,
        search: searchQuery,
        categories,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
    staleTime: STALE_TIME,
  });

  const products = queryInfo.data?.pages.flatMap((page) => page.products) ?? [];

  return {
    ...queryInfo,
    products,
  };
};
