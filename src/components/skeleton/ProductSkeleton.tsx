import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ProductSkeleton() {
  return (
    <Card className="h-full">
      <Skeleton className="aspect-square w-full rounded-none" />
      <CardHeader className="pb-2">
        <div className="mb-1 flex items-center justify-between">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-4 w-10" />
        </div>
        <Skeleton className="h-5 w-3/4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="mb-2 h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </CardContent>
      <CardFooter className="justify-between pt-3">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-4 w-14" />
      </CardFooter>
    </Card>
  );
}
