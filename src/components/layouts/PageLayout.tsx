"use client";

import { ReactNode, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { usePathname } from "next/navigation";

interface PageLayoutProps {
  topItem: ReactNode;
  filter: ReactNode;
  content: ReactNode;
}

export default function PageLayout({
  topItem,
  filter,
  content,
}: PageLayoutProps) {
  const [mobileFilterPath, setMobileFilterPath] = useState<string | null>(null);
  const pathname = usePathname();
  const isMobileFilterOpen = mobileFilterPath === pathname;

  return (
    <div className="mx-auto flex h-full w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8">
      <div className="flex h-full w-full flex-1 flex-col items-start gap-8 lg:flex-row">
        <div className="hidden w-full shrink-0 py-8 lg:block lg:h-full lg:w-72">
          {filter}
        </div>

        <div className="relative flex h-full w-full flex-1 flex-col overflow-hidden">
          <div className="border-divider flex shrink-0 items-center justify-between border-b py-4 lg:hidden">
            <h2 className="text-content-main text-lg font-bold">Filters</h2>
            <button
              onClick={() => setMobileFilterPath(pathname)}
              className="bg-app-surface border-divider hover:bg-app-surface-hover text-content-main flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filter
            </button>
          </div>

          <div className="scrollbar-hide flex-1 overflow-y-auto pt-6 pr-2 pb-16 lg:pt-8">
            <div className="shrink-0">{topItem}</div>
            {content}
          </div>
        </div>
      </div>

      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-60 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileFilterPath(null)}
          />

          <div className="bg-app-surface animate-in slide-in-from-left-full absolute inset-y-0 left-0 flex w-80 max-w-[85vw] flex-col shadow-xl duration-300">
            <div className="border-divider flex shrink-0 items-center justify-between border-b p-4">
              <h2 className="text-content-main text-lg font-bold">Filters</h2>
              <button
                onClick={() => setMobileFilterPath(null)}
                className="hover:bg-app-muted text-content-subtle -mr-2 rounded-lg p-2 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="scrollbar-hide flex-1 overflow-y-auto p-4">
              {filter}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
