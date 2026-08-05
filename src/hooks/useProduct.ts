import { useQuery } from "@tanstack/react-query";
import { fetchProductByIdApi } from "@/services/api";
import { STALE_TIME } from "@/lib/constants";

export const useProduct = (id: string) =>
  useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductByIdApi(id),
    staleTime: STALE_TIME,
  });
