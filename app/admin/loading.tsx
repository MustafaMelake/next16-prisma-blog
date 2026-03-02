import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminLoading() {
  return (
    <div className="container mx-auto py-10 px-4 space-y-8 animate-pulse">
      {/* 1. Header Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <Skeleton className="h-10 w-48" /> {/* Dashboard Title */}
          <Skeleton className="h-4 w-64" /> {/* Description */}
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-32" /> {/* Manage Users Button */}
          <Skeleton className="h-10 w-40" /> {/* Create Post Button */}
        </div>
      </div>

      {/* 2. Stats Bar Skeleton (3 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="border-muted">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-lg" /> {/* Icon Box */}
                <div className="space-y-2">
                  <Skeleton className="h-3 w-20" /> {/* Label */}
                  <Skeleton className="h-7 w-12" /> {/* Number */}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 3. Posts List Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" /> {/* "Your Stories" Title */}
        <div className="grid gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-5 border rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card/50"
            >
              {/* Post Info Side */}
              <div className="space-y-3 w-full md:w-auto">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-6 w-48 md:w-64" /> {/* Title */}
                  <Skeleton className="h-5 w-14 rounded-full" /> {/* Badge */}
                </div>
                <div className="flex items-center gap-4">
                  <Skeleton className="h-4 w-12" /> {/* Likes */}
                  <Skeleton className="h-4 w-12" /> {/* Comments */}
                  <Skeleton className="h-4 w-24" /> {/* Date */}
                </div>
              </div>

              {/* Action Buttons Side */}
              <div className="flex items-center gap-2 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                <Skeleton className="h-9 flex-1 md:w-20 rounded-md" />{" "}
                {/* View */}
                <Skeleton className="h-9 flex-1 md:w-24 rounded-md" />{" "}
                {/* Publish */}
                <Skeleton className="h-9 flex-1 md:w-20 rounded-md" />{" "}
                {/* Edit */}
                <Skeleton className="h-9 w-10 rounded-md bg-destructive/10" />{" "}
                {/* Delete */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
