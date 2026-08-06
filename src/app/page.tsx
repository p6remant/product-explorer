import PageLayout from "@/components/layouts/PageLayout";
import { Header } from "@/components/ui/Header";
import CategoryFilter from "@/components/filters/CategoryFilter";
import ProductListContent from "@/components/products/ProductListContent";
import { FadeIn } from "@/components/ui/animations";
import { fetchProductsApi } from "@/services/api";
import { PAGE_SIZE } from "@/lib/constants";
import { Suspense } from "react";

type SearchParamsObject = Record<string, string | string[] | undefined>;

type HomePageProps = {
  searchParams: Promise<SearchParamsObject> | SearchParamsObject;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedParams = await searchParams;
  const rawCategories = resolvedParams?.categories;

  const selectedCategories =
    typeof rawCategories === "string"
      ? rawCategories.split(",").filter(Boolean)
      : [];

  const initialProducts =
    selectedCategories.length === 0
      ? await fetchProductsApi({ limit: PAGE_SIZE, skip: 0 })
      : undefined;

  return (
    <FadeIn
      direction="none"
      duration={0.3}
      className="flex h-full w-full flex-1 flex-col"
    >
      <PageLayout
        topItem={
          <Header
            title="Explore Products"
            description="Browse, search, and manage your favorite items"
          />
        }
        filter={
          <Suspense
            fallback={
              <div className="bg-app-surface h-96 w-full animate-pulse rounded-xl" />
            }
          >
            <CategoryFilter />
          </Suspense>
        }
        content={
          <ProductListContent
            selectedCategories={selectedCategories}
            initialProducts={initialProducts}
          />
        }
      />
    </FadeIn>
  );
}
