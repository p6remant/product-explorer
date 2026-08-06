"use client";

import { useProductStore } from "@/store/zustand/useProductStore";
import { useDebounce } from "@/hooks/useDebounce";
import { useInfiniteProducts } from "@/hooks/useInfiniteProducts";
import ProductCard from "@/components/products/ProductCard";
import ProductSkeleton from "@/components/skeleton/ProductSkeleton";
import InfiniteScrollTrigger from "@/components/common/InfiniteScrollTrigger";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { RefreshCw } from "lucide-react";

export default function ProductListContent({
  selectedCategories,
}: {
  selectedCategories: string[];
}) {
  const searchQuery = useProductStore((state) => state.searchQuery);
  const debouncedSearch = useDebounce(searchQuery, 300);

  const {
    products,
    isLoading,
    isFetchingNextPage,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteProducts(debouncedSearch, selectedCategories);

  if (isError) {
    return (
      <div className="flex justify-center py-16">
        <Card className="max-w-md p-8 text-center">
          <CardContent className="flex flex-col items-center gap-4 p-0">
            <h2 className="text-status-error text-xl font-semibold">
              Failed to load products
            </h2>
            <p className="text-content-muted text-sm">
              {error instanceof Error ? error.message : "Something went wrong"}
            </p>
            <Button
              type="button"
              variant="outline"
              leftIcon={<RefreshCw className="h-4 w-4" />}
              onClick={() => window.location.reload()}
            >
              Refresh
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            priority={index < 4}
          />
        ))}

        {(isLoading || isFetchingNextPage) &&
          Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={`skeleton-${i}`} />
          ))}
      </div>

      {!isLoading && products.length === 0 && (
        <div className="text-content-muted py-16 text-center">
          No products found matching your search query.
        </div>
      )}

      <InfiniteScrollTrigger
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
        className="mt-6 h-10"
      />
    </>
  );
}
