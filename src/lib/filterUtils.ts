export function getSelectedCategoriesFromUrl(
  searchParams: { get: (key: string) => string | null },
  paramKey: string = "categories",
): string[] {
  const value = searchParams.get(paramKey);
  return value ? value.split(",").filter(Boolean) : [];
}

export function updateUrlFilter(
  pathname: string,
  searchParams: { toString: () => string },
  paramKey: string,
  selectedValues: string[],
): string {
  const params = new URLSearchParams(searchParams.toString());

  if (selectedValues.length > 0) {
    params.set(paramKey, selectedValues.join(","));
  } else {
    params.delete(paramKey);
  }

  const queryString = params.toString();
  return queryString ? `${pathname}?${queryString}` : pathname;
}

export function clearAllFiltersUrl(
  pathname: string,
  searchParams: { toString: () => string },
  keysToClear: string[],
): string {
  const params = new URLSearchParams(searchParams.toString());
  keysToClear.forEach((key) => params.delete(key));
  const queryString = params.toString();
  return queryString ? `${pathname}?${queryString}` : pathname;
}
