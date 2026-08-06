"use client";

import { use } from "react";
import { useProduct } from "@/hooks/useProduct";
import ProductDetailView from "@/components/products/ProductDetailView";
import ProductDetailError from "@/components/products/ProductDetailError";
import ProductDetailSkeleton from "@/components/skeleton/ProductDetailSkeleton";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data: product, isLoading, isError, error } = useProduct(id);

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (isError || !product) {
    return (
      <ProductDetailError
        message={error instanceof Error ? error.message : "Product not found"}
      />
    );
  }

  return (
    <div className="min-h-0 w-full flex-1 overflow-y-auto">
      <ProductDetailView product={product} />
    </div>
  );
}
