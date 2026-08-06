import PageLayout from "@/components/layouts/PageLayout";
import { Header } from "@/components/ui/Header";
import CategoryFilter from "@/components/filters/CategoryFilter";
import ProductListContent from "@/components/products/ProductListContent";
import { FadeIn } from "@/components/ui/animations";
import { Suspense } from "react";

type SearchParamsObject = Record<string, string | string[] | undefined>;

type HomePageProps = {
  searchParams: Promise<SearchParamsObject> | SearchParamsObject;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedSearchParams =
    searchParams instanceof Promise ? await searchParams : searchParams;

  const categoriesParam = resolvedSearchParams.categories;
  const selectedCategories =
    typeof categoriesParam === "string"
      ? categoriesParam.split(",").filter(Boolean)
      : [];

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
        content={<ProductListContent selectedCategories={selectedCategories} />}
      />
    </FadeIn>
  );
}
