import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ProductDetailSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Skeleton className="mb-6 h-5 w-32" />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <Card className="overflow-hidden rounded-2xl shadow-sm">
            <Skeleton className="aspect-square w-full rounded-none" />
          </Card>
          <div className="flex gap-3 pb-2">
            <Skeleton className="h-20 w-20 shrink-0 rounded-lg" />
            <Skeleton className="h-20 w-20 shrink-0 rounded-lg" />
            <Skeleton className="h-20 w-20 shrink-0 rounded-lg" />
            <Skeleton className="h-20 w-20 shrink-0 rounded-lg" />
          </div>
        </div>

        <div className="flex flex-col">
          <CardHeader className="p-0 pb-2">
            <div className="mb-2 flex items-center gap-2">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
            <Skeleton className="h-10 w-3/4" />
          </CardHeader>

          <div className="mb-6 flex items-center gap-2">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-36" />
          </div>

          <Card className="mb-6 p-4">
            <Skeleton className="h-9 w-28" />
          </Card>

          <CardContent className="p-0">
            <Skeleton className="mb-2 h-3 w-full" />
            <Skeleton className="mb-2 h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </CardContent>

          <Card className="my-8 p-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center">
                <Skeleton className="mb-1 h-5 w-5 rounded" />
                <Skeleton className="h-3 w-16" />
              </div>
              <div className="flex flex-col items-center">
                <Skeleton className="mb-1 h-5 w-5 rounded" />
                <Skeleton className="h-3 w-14" />
              </div>
              <div className="flex flex-col items-center">
                <Skeleton className="mb-1 h-5 w-5 rounded" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          </Card>

          <CardFooter className="border-divider border-t p-0 pt-4">
            <Skeleton className="h-12 w-full rounded-lg" />
          </CardFooter>
        </div>
      </div>
    </div>
  );
}
