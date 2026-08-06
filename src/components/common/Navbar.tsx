"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useProductStore } from "@/store/zustand/useProductStore";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const favoritesCount = useProductStore((state) => state.favorites.length);

  return (
    <header className="bg-app-surface/80 border-divider sticky top-0 z-50 border-b backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-content-main text-xl font-bold tracking-tight"
        >
          Product<span className="text-brand-primary">Explorer</span>
        </Link>

        <div className="flex items-center gap-4">
          <div
            className="relative inline-flex cursor-pointer p-0.5"
            aria-label={`${favoritesCount} favorites`}
          >
            <Heart className="text-status-heart fill-status-heart h-6 w-6" />
            {favoritesCount > 0 && (
              <span className="bg-status-heart ring-app-surface absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] leading-none font-bold text-white ring-2">
                {favoritesCount > 99 ? "99+" : favoritesCount}
              </span>
            )}
          </div>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
