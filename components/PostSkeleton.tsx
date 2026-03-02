import { Skeleton } from "@/components/ui/skeleton";

export function PostSkeleton() {
  return (
    <article className="container mx-auto py-20 max-w-3xl px-4 animate-pulse">
      {/* Header Skeleton */}
      <header className="mb-8 space-y-6">
        {/* Title */}
        <Skeleton className="h-12 w-full md:w-3/4" />

        {/* Date & Reading Time */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Author & Like Button Row */}
        <div className="flex justify-between items-center pt-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-32" />
          </div>
          <Skeleton className="h-10 w-16 rounded-md" />
        </div>
      </header>

      {/* Content Skeleton (Paragraphs) */}
      <div className="space-y-4 border-t pt-8">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="py-4" /> {/* Gap */}
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-full" />
      </div>

      <hr className="my-12 border-muted" />

      {/* Comments Section Skeleton */}
      <div className="space-y-6">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <div className="space-y-4 pt-4">
          <div className="flex gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
