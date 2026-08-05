"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { Product } from "@/types/product";
import { Card } from "@/components/ui/Card";
import { ScaleToggle } from "@/components/ui/animations";
import { cn } from "@/lib/utils";

interface ProductDetailGalleryProps {
  product: Product;
  activeImage: string;
  onSelectImage: (image: string) => void;
  favorite: boolean;
  onToggleFavorite: () => void;
}

export default function ProductDetailGallery({
  product,
  activeImage,
  onSelectImage,
  favorite,
  onToggleFavorite,
}: ProductDetailGalleryProps) {
  return (
    <div className="space-y-4">
      <Card className="overflow-hidden rounded-2xl shadow-sm">
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={activeImage}
            alt={product.title}
            fill
            priority
            loading="eager"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <button
            type="button"
            onClick={onToggleFavorite}
            aria-label="Toggle Favorite"
            className="bg-app-surface/80 absolute top-4 right-4 cursor-pointer rounded-full p-3 shadow backdrop-blur-md transition hover:scale-105"
          >
            <ScaleToggle toggleKey={favorite}>
              <Heart
                className={cn(
                  "h-6 w-6",
                  favorite
                    ? "fill-status-heart text-status-heart"
                    : "text-content-muted",
                )}
              />
            </ScaleToggle>
          </button>
        </div>
      </Card>

      {product.images.length > 1 && (
        <div className="flex scrollbar-none gap-3 overflow-x-auto pb-2">
          {product.images.map((img, idx) => (
            <button
              key={`${img}-${idx}`}
              type="button"
              onClick={() => onSelectImage(img)}
              className={cn(
                "relative h-20 w-20 shrink-0 cursor-pointer overflow-hidden rounded-lg border-2 transition",
                activeImage === img
                  ? "border-brand-primary"
                  : "border-divider hover:border-brand-primary/50",
              )}
            >
              <Image
                src={img}
                alt={`${product.title} ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
