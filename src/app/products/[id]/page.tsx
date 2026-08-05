"use client";

import { use } from "react";
import { useProduct } from "@/hooks/useProduct";
import ProductDetailView from "@/components/products/ProductDetailView";
import ProductDetailError from "@/components/products/ProductDetailError";
import ProductDetailSkeleton from "@/components/skeleton/ProductDetailSkeleton";
import { FadeIn } from "@/components/ui/animations";

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
    <FadeIn direction="up" duration={0.3}>
      <ProductDetailView product={product} />
    </FadeIn>
  );
}
