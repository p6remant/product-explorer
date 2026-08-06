"use client";

import { Package, ShieldCheck, Star, Truck } from "lucide-react";
import { Product } from "@/types/product";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";

interface ProductDetailInfoProps {
  product: Product;
  favorite: boolean;
  onToggleFavorite: () => void;
}

export default function ProductDetailInfo({
  product,
  favorite,
  onToggleFavorite,
}: ProductDetailInfoProps) {
  return (
    <div className="flex flex-col">
      <CardHeader className="p-0 pb-2">
        <div className="mb-2 flex items-center gap-2">
          <Badge variant="default">{product.category}</Badge>
          {product.brand && <Badge variant="success">{product.brand}</Badge>}
        </div>

        <h1 className="text-content-main text-xl font-bold tracking-tight md:text-3xl">
          {product.title}
        </h1>
      </CardHeader>

      <div className="mb-6 flex items-center gap-2">
        <div className="text-status-star flex items-center">
          <Star className="fill-status-star h-5 w-5" />
          <span className="text-content-main ml-1 text-sm font-semibold">
            {product.rating.toFixed(1)}
          </span>
        </div>
        <span className="text-content-subtle">•</span>
        <span className="text-status-success text-xs font-medium">
          In Stock ({product.stock} available)
        </span>
      </div>

      <Card className="mb-6 p-4">
        <div className="flex items-baseline gap-3">
          <span className="text-content-main text-3xl font-extrabold">
            ${product.price.toFixed(2)}
          </span>
          {product.discountPercentage > 0 && (
            <span className="text-status-error text-sm font-semibold">
              {product.discountPercentage.toFixed(0)}% OFF
            </span>
          )}
        </div>
      </Card>

      <div className="mb-6">
        <p className="text-content-muted text-sm leading-relaxed">
          {product.description}
        </p>
      </div>

      <Card className="mb-12 p-4 md:mb-8">
        <div className="grid grid-cols-3 gap-3">
          <div className="text-content-muted flex flex-col items-center text-center text-xs">
            <Truck className="text-brand-primary mb-1 h-5 w-5" />
            <span>Fast Shipping</span>
          </div>
          <div className="text-content-muted flex flex-col items-center text-center text-xs">
            <ShieldCheck className="text-brand-primary mb-1 h-5 w-5" />
            <span>Warranty</span>
          </div>
          <div className="text-content-muted flex flex-col items-center text-center text-xs">
            <Package className="text-brand-primary mb-1 h-5 w-5" />
            <span>Free Return</span>
          </div>
        </div>
      </Card>

      <div className="border-divider hidden border-t pt-4 lg:block">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={onToggleFavorite}
        >
          {favorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </div>
    </div>
  );
}
