import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="container mx-auto py-12 px-4">
      {/* Header Skeleton */}
      <div className="flex flex-col items-center mb-10 space-y-4">
        {/* Title Skeleton */}
        <Skeleton className="h-10 w-64 md:w-80" />
        {/* Search Input Skeleton */}
        <Skeleton className="h-11 w-full max-w-md rounded-full" />
      </div>

      {/* Posts Grid Skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card
            key={i}
            className="h-full overflow-hidden border-muted-foreground/20"
          >
            <CardHeader className="space-y-3">
              <div className="flex items-center justify-between mb-2">
                {/* Badge Skeleton */}
                <Skeleton className="h-5 w-16 rounded-full" />
                {/* Date Skeleton */}
                <Skeleton className="h-4 w-24" />
              </div>
              {/* Title Skeleton (2 lines) */}
              <div className="space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-2/3" />
              </div>
            </CardHeader>

            <CardContent className="space-y-2">
              {/* Content/Excerpt Skeleton (3 lines) */}
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </CardContent>

            <CardFooter className="flex items-center justify-between border-t pt-4">
              {/* Author Skeleton */}
              <div className="flex items-center space-x-2">
                <Skeleton className="h-7 w-28 rounded-full" />
              </div>

              {/* Stats Skeleton (Likes & Comments) */}
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-8" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="mt-10 flex justify-center gap-2">
        <Skeleton className="h-10 w-10 rounded-md" />
        <Skeleton className="h-10 w-10 rounded-md" />
        <Skeleton className="h-10 w-10 rounded-md" />
      </div>
    </main>
  );
}
