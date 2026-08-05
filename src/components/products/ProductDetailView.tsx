"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Product } from "@/types/product";
import { useProductStore } from "@/store/zustand/useProductStore";
import ProductDetailGallery from "@/components/products/ProductDetailGallery";
import ProductDetailInfo from "@/components/products/ProductDetailInfo";

interface ProductDetailViewProps {
  product: Product;
}

export default function ProductDetailView({ product }: ProductDetailViewProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const favorite = useProductStore((state) =>
    state.favorites.includes(product.id),
  );
  const toggleFavorite = useProductStore((state) => state.toggleFavorite);
  const activeImage = selectedImage ?? product.thumbnail;
  const handleToggleFavorite = () => toggleFavorite(product.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="text-content-muted hover:text-content-main mb-6 inline-flex items-center text-sm transition"
      >
        <ArrowLeft className="mr-1.5 h-4 w-4" /> Back to Products
      </Link>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ProductDetailGallery
          product={product}
          activeImage={activeImage}
          onSelectImage={setSelectedImage}
          favorite={favorite}
          onToggleFavorite={handleToggleFavorite}
        />
        <ProductDetailInfo
          product={product}
          favorite={favorite}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>
    </div>
  );
}
