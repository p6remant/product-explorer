"use client";

import { useProductStore } from "@/store/zustand/useProductStore";
import { useDebounce } from "@/hooks/useDebounce";
import { useInfiniteProducts } from "@/hooks/useInfiniteProducts";
import ProductCard from "@/components/products/ProductCard";
import ProductSkeleton from "@/components/skeleton/ProductSkeleton";
import InfiniteScrollTrigger from "@/components/common/InfiniteScrollTrigger";

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
      <div className="bg-status-error/10 text-status-error mb-6 rounded-lg p-4 text-center">
        {error instanceof Error ? error.message : "Failed to load products"}
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
