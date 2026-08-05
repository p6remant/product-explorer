"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { Product } from "@/types/product";
import { useProductStore } from "@/store/zustand/useProductStore";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AnimatedCard, ScaleToggle } from "@/components/ui/animations";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority }: ProductCardProps) {
  const { isFavorite, toggleFavorite } = useProductStore();
  const favorite = isFavorite(product.id);

  return (
    <AnimatedCard>
      <Card hoverable className="group h-full">
        <div className="bg-app-muted relative aspect-square w-full overflow-hidden">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            priority={priority}
            loading={priority ? "eager" : "lazy"}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover"
          />

          <Button
            type="button"
            variant="ghost"
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(product.id);
            }}
            aria-label="Toggle Favorite"
            className="bg-app-surface/80 hover:bg-app-surface absolute top-3 right-3 rounded-full p-2 shadow backdrop-blur-sm"
          >
            <ScaleToggle toggleKey={favorite}>
              <Heart
                className={cn(
                  "h-5 w-5",
                  favorite
                    ? "fill-status-heart text-status-heart"
                    : "text-content-muted",
                )}
              />
            </ScaleToggle>
          </Button>
        </div>

        <CardHeader className="space-y-1 p-3 pb-1">
          <div className="flex items-center justify-between">
            <Badge variant="default">{product.category}</Badge>
            <div className="text-status-star flex items-center gap-1 text-xs font-semibold">
              <Star className="fill-status-star h-3.5 w-3.5" />
              <span className="text-content-main">
                {product.rating.toFixed(1)}
              </span>
            </div>
          </div>
          <CardTitle className="mb-0 truncate">{product.title}</CardTitle>
          <p className="text-content-muted line-clamp-2 pt-0.5 text-xs leading-relaxed">
            {product.description}
          </p>
        </CardHeader>

        <CardFooter className="justify-between px-3 py-2 pt-2">
          <span className="text-content-main text-lg font-bold">
            ${product.price.toFixed(2)}
          </span>
          <Link
            href={`/products/${product.id}`}
            className="text-brand-primary text-xs font-medium hover:underline"
          >
            Details →
          </Link>
        </CardFooter>
      </Card>
    </AnimatedCard>
  );
}
