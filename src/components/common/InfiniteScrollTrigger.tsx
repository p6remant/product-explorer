import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

interface InfiniteScrollTriggerProps {
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void | Promise<unknown>;
  threshold?: number;
  className?: string;
  enabled?: boolean;
}

export default function InfiniteScrollTrigger({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  threshold,
  className = "h-10",
  enabled = true,
}: InfiniteScrollTriggerProps) {
  const ref = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    threshold,
    enabled,
  });

  return <div ref={ref} className={className} />;
}
