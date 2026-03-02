import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { deletePost, togglePublish } from "../actions/post";
import {
  Heart,
  MessageCircle,
  FileText,
  Plus,
  ExternalLink,
  Trash2,
  Edit3,
  Users, // Import the Users icon
} from "lucide-react";
import { SearchInput } from "@/components/SearchInput";

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const session = await getSession();

  const { q } = await searchParams;

  const searchCondition = q
    ? {
        OR: [
          { title: { contains: q, mode: "insensitive" as const } },
          { content: { contains: q, mode: "insensitive" as const } },
        ],
      }
    : {};

  if (!session) {
    redirect("/sign-in");
  }

  if (session.user.role === "USER") {
    redirect("/");
  }

  let posts;
  if (session.user.role === "ADMIN") {
    posts = await prisma.post.findMany({
      where: {
        ...(session.user.role !== "ADMIN" ? { authorId: session.user.id } : {}),
        ...searchCondition,
      },
      include: {
        author: true,
        _count: { select: { likes: true, comments: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  } else {
    posts = await prisma.post.findMany({
      where: { authorId: session.user.id },
      include: {
        author: true,
        _count: { select: { likes: true, comments: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  const totalLikes = posts.reduce((acc, post) => acc + post._count.likes, 0);
  const totalComments = posts.reduce(
    (acc, post) => acc + post._count.comments,
    0
  );

  return (
    <div className="container mx-auto py-10 px-4 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your content and track your performance.
          </p>
        </div>
        <div className="w-full sm:w-64">
          <SearchInput />
        </div>
        <div className="flex items-center gap-3">
          {/* Only show User Management to ADMINs */}
          {session.user.role === "ADMIN" && (
            <Link href="/admin/users">
              <Button variant="outline" className="gap-2">
                <Users className="h-4 w-4" /> Manage Users
              </Button>
            </Link>
          )}

          <Link href="/admin/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Create New Post
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Summary Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <FileText />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground uppercase">
                  Total Posts
                </p>
                <p className="text-2xl font-bold">{posts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-red-500/5 border-red-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
                <Heart />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground uppercase">
                  Total Likes
                </p>
                <p className="text-2xl font-bold">{totalLikes}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-blue-500/5 border-blue-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                <MessageCircle />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground uppercase">
                  Total Comments
                </p>
                <p className="text-2xl font-bold">{totalComments}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Posts List Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Stories</h2>
        {posts.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed rounded-xl bg-muted/30">
            <p className="text-muted-foreground">
              You haven&apos;t written any stories yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="group p-5 border rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-card hover:border-primary/50 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-bold text-lg leading-none">
                      {post.title}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        post.published
                          ? "bg-green-500/10 text-green-600 border border-green-500/20"
                          : "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20"
                      }`}
                    >
                      {post.published ? "Live" : "Draft"}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3" /> {post._count.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />{" "}
                      {post._count.comments}
                    </div>
                    <span>•</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                  <Link
                    href={`/posts/${post.id}`}
                    className="flex-1 md:flex-none"
                  >
                    <Button variant="ghost" size="sm" className="w-full gap-2">
                      <ExternalLink className="h-4 w-4" /> View
                    </Button>
                  </Link>

                  <form
                    action={async () => {
                      "use server";
                      await togglePublish(post.id, post.published);
                    }}
                  >
                    <Button variant="outline" size="sm" className="w-full">
                      {post.published ? "Unpublish" : "Publish"}
                    </Button>
                  </form>

                  <Link
                    href={`/admin/${post.id}`}
                    className="flex-1 md:flex-none"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2"
                    >
                      <Edit3 className="h-4 w-4" /> Edit
                    </Button>
                  </Link>

                  <form action={deletePost}>
                    <input type="hidden" name="id" value={post.id} />
                    <Button variant="destructive" size="sm" className="w-full">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
