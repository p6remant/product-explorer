"use client";

import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { useProductStore } from "@/store/zustand/useProductStore";
import { cn } from "@/lib/utils";

export default function SearchBar() {
  const searchQuery = useProductStore((state) => state.searchQuery);
  const setSearchQuery = useProductStore((state) => state.setSearchQuery);

  return (
    <div className="relative w-full sm:max-w-xs">
      <Input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        icon={<Search className="h-4 w-4" />}
        aria-label="Search products"
        className={cn(searchQuery && "pr-9")}
      />
      {searchQuery && (
        <button
          type="button"
          onClick={() => setSearchQuery("")}
          aria-label="Clear search"
          className="text-content-subtle hover:text-content-main absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
