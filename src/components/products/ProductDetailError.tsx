import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

interface ProductDetailErrorProps {
  message?: string;
}

export default function ProductDetailError({
  message = "Product not found",
}: ProductDetailErrorProps) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-4">
      <Card className="max-w-md p-8 text-center">
        <CardContent className="flex flex-col items-center p-0">
          <h2 className="text-status-error mb-2 text-xl font-semibold">
            Failed to load product
          </h2>
          <p className="text-content-muted mb-4 text-sm">{message}</p>
          <Link href="/">
            <Button
              variant="outline"
              leftIcon={<ArrowLeft className="h-4 w-4" />}
            >
              Back to Products
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
