"use client";

import { useState, useTransition } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCategories } from "@/hooks/useCategories";
import { FilterAccordion } from "./FilterAccordion";
import {
  getSelectedCategoriesFromUrl,
  updateUrlFilter,
  clearAllFiltersUrl,
} from "@/lib/filterUtils";
import SearchBar from "@/components/common/SearchBar";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function CategoryFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [isExpanded, setIsExpanded] = useState(false);

  const { data: categories = [], isLoading } = useCategories();
  const activeCategories = getSelectedCategoriesFromUrl(
    searchParams,
    "categories",
  );

  const visibleCategories = isExpanded ? categories : categories.slice(0, 6);
  const hiddenCount = categories.length - 6;

  // toggle category selection in URL
  const handleCategorySelect = (slug: string) => {
    const updated = activeCategories.includes(slug)
      ? activeCategories.filter((id) => id !== slug)
      : [...activeCategories, slug];

    const nextUrl = updateUrlFilter(
      pathname,
      searchParams,
      "categories",
      updated,
    );

    startTransition(() => {
      router.replace(nextUrl, { scroll: false });
    });
  };

  // clear all filters
  const handleClearAll = () => {
    const nextUrl = clearAllFiltersUrl(pathname, searchParams, ["categories"]);

    startTransition(() => {
      router.replace(nextUrl, { scroll: false });
    });
  };

  return (
    <aside className="bg-app-surface border-divider scrollbar-hide flex h-fit max-h-full w-full max-w-xs flex-col overflow-y-auto rounded-xl border p-5 shadow-sm">
      <div
        className={cn(
          "flex items-center",
          activeCategories.length > 0
            ? "border-divider justify-between border-b pb-4"
            : "lg:border-divider justify-end lg:justify-between lg:border-b lg:pb-4",
        )}
      >
        <h2 className="text-content-main hidden text-lg font-bold lg:block">
          Filter
        </h2>
        {activeCategories.length > 0 && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClearAll}
            className="text-brand-primary hover:text-brand-primary ml-auto px-0 hover:bg-transparent hover:underline"
          >
            Clear all
          </Button>
        )}
      </div>

      <div className="mt-4 mb-2">
        <SearchBar />
      </div>

      <div
        className={cn(
          "space-y-1",
          isPending && "pointer-events-none opacity-70",
        )}
      >
        <FilterAccordion title="Category" defaultOpen={true}>
          {isLoading ? (
            <div className="space-y-2 py-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-app-muted h-4 w-3/4 animate-pulse rounded"
                />
              ))}
            </div>
          ) : (
            <>
              {visibleCategories.map((cat) => {
                const isSelected = activeCategories.includes(cat.slug);
                return (
                  <label
                    key={cat.slug}
                    className="text-content-main hover:text-brand-primary flex cursor-pointer items-center gap-2.5 text-sm capitalize transition"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleCategorySelect(cat.slug)}
                      className="border-divider text-brand-primary focus:ring-brand-primary accent-brand-primary h-4 w-4 cursor-pointer rounded"
                    />
                    <span
                      className={
                        isSelected ? "text-brand-primary font-semibold" : ""
                      }
                    >
                      {cat.name}
                    </span>
                  </label>
                );
              })}

              {!isExpanded && hiddenCount > 0 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(true)}
                  className="text-brand-primary hover:text-brand-primary mt-1 px-0 font-semibold hover:bg-transparent hover:underline"
                >
                  + {hiddenCount} more
                </Button>
              )}
            </>
          )}
        </FilterAccordion>
      </div>
    </aside>
  );
}
