import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { SearchInput } from "@/components/SearchInput";
import { Badge } from "@/components/ui/badge";
import { Calendar, Heart, MessageCircle, User } from "lucide-react";
import { Pagination } from "@/components/Pagination";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const { q, page } = await searchParams;

  const currentPage = Number(page) || 1;
  const postsPerPage = 6; //  change number
  const skip = (currentPage - 1) * postsPerPage;

  // 1. Fetch the posts for the current page
  const posts = await prisma.post.findMany({
    where: {
      published: true,
      OR: q
        ? [
            { title: { contains: q, mode: "insensitive" } },
            { content: { contains: q, mode: "insensitive" } },
          ]
        : undefined,
    },
    include: {
      author: true,
      _count: { select: { likes: true, comments: true } },
    },
    orderBy: { createdAt: "desc" },
    take: postsPerPage,
    skip: skip,
  });

  // 2. Get the total count to know how many pages exist
  const totalPosts = await prisma.post.count({
    where: {
      published: true,
      OR: q
        ? [
            { title: { contains: q, mode: "insensitive" } },
            { content: { contains: q, mode: "insensitive" } },
          ]
        : undefined,
    },
  });

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (
    <main className="container mx-auto py-12 px-4">
      <div className="flex flex-col items-center mb-10 space-y-4">
        <h1 className="text-4xl font-extrabold text-center tracking-tight">
          Latest Stories
        </h1>
        <SearchInput />
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Link href={`/posts/${post.id}`} key={post.id} className="group">
              <Card className="h-full overflow-hidden border-muted-foreground/20 transition-all duration-300 hover:shadow-xl hover:border-primary/50 dark:bg-card">
                <CardHeader className="space-y-1">
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant="secondary"
                      className="font-medium text-[10px] uppercase tracking-wider"
                    >
                      Article
                    </Badge>
                    <div className="flex items-center text-muted-foreground text-xs">
                      <Calendar className="mr-1 h-3 w-3" />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {post.content}
                  </p>
                </CardContent>

                <CardFooter className="flex items-center justify-between border-t pt-4 text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center bg-muted/50 px-2 py-1 rounded-full">
                      <User className="h-3 w-3 mr-1" />
                      <span className="text-xs font-medium">
                        {post.author.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 hover:text-red-500 transition-colors">
                      <Heart className="h-4 w-4" />
                      <span className="text-xs font-semibold">
                        {post._count.likes}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 hover:text-primary transition-colors">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-xs font-semibold">
                        {post._count.comments}
                      </span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center py-20 border rounded-xl bg-muted/10">
            <p className="text-muted-foreground text-lg">
              No stories found matching <span className="font-bold"></span>
            </p>
          </div>
        )}
      </div>
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </main>
  );
}
