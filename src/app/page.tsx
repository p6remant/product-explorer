"use client";

import { useProductStore } from "@/store/zustand/useProductStore";
import { useDebounce } from "@/hooks/useDebounce";
import { useInfiniteProducts } from "@/hooks/useInfiniteProducts";
import ProductCard from "@/components/products/ProductCard";
import ProductSkeleton from "@/components/products/ProductSkeleton";
import SearchBar from "@/components/common/SearchBar";
import InfiniteScrollTrigger from "@/components/common/InfiniteScrollTrigger";
import { FadeIn } from "@/components/ui/animations";

export default function Home() {
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
  } = useInfiniteProducts(debouncedSearch);

  return (
    <FadeIn direction="none" duration={0.3}>
      <div className="min-h-screen pb-16">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-content-main text-3xl font-bold tracking-tight">
                Explore Products
              </h1>
              <p className="text-content-muted mt-1 text-sm">
                Browse, search, and manage your favorite items
              </p>
            </div>
            <SearchBar />
          </div>

          {isError && (
            <div className="bg-status-error/10 text-status-error mb-6 rounded-lg p-4 text-center">
              {error instanceof Error
                ? error.message
                : "Failed to load products"}
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
        </div>
      </div>
    </FadeIn>
  );
}
