"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const favoritesCount = 0;

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
          <div className="text-content-main relative flex cursor-pointer items-center gap-1.5 text-sm font-semibold">
            <Heart className="text-status-heart fill-status-heart h-5 w-5" />
            <span>{favoritesCount}</span>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
