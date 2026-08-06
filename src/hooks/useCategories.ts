import { useQuery } from "@tanstack/react-query";
import { fetchCategoriesApi } from "@/services/api";
import { STALE_TIME } from "@/lib/constants";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategoriesApi,
    staleTime: STALE_TIME,
  });
};
