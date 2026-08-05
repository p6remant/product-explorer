import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchProductsApi } from "@/services/api";

const PAGE_SIZE = 10;

export const useInfiniteProducts = (searchQuery: string) => {
  const queryInfo = useInfiniteQuery({
    queryKey: ["products", "infinite", searchQuery],
    queryFn: ({ pageParam = 0 }) =>
      fetchProductsApi({
        limit: PAGE_SIZE,
        skip: pageParam,
        search: searchQuery,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit;
      return nextSkip < lastPage.total ? nextSkip : undefined;
    },
    staleTime: 5 * 60 * 1000,
  });

  const products = queryInfo.data?.pages.flatMap((page) => page.products) ?? [];

  return {
    ...queryInfo,
    products,
  };
};
