import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server"; 
import { notFound } from "next/navigation";
import { LikeButton } from "@/components/LikeButton";
import { Comments } from "@/components/Comments";
import ReadingBar from "@/components/ReadingBar";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession(); // 3. Get the session
  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
    include: {
      author: true,
      _count: { select: { likes: true } },
      likes: { where: { userId: session?.user.id || "no user!" } },
      comments: {
        include: { user: true }, // can show who wrote the comment
        orderBy: { createdAt: "desc" },
      },
    },
  });
  if (!post) notFound();

  const isLiked = post.likes.length > 0;

  function calculateReadingTime(content: string) {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute);
    return time;
  }
  const readingTime = calculateReadingTime(post.content);

  return (
    <article className="container mx-auto py-20 max-w-3xl px-4">
      <ReadingBar />
      <header className="mb-8">
        <h1 className="text-5xl font-bold mb-4">{post.title}</h1>
        <div className="flex items-center text-muted-foreground text-sm gap-2">
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            ⏱️ {readingTime} min read
          </span>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">
            Written by{" "}
            <span className="font-semibold text-foreground">
              {post.author.name}
            </span>
          </p>

          {/* 5. Place the Like Button here */}
          <LikeButton
            postId={post.id}
            initialIsLiked={isLiked}
            initialCount={post._count.likes}
          />
        </div>
      </header>

      <div className="prose prose-lg dark:prose-invert border-t pt-8">
        {post.content.split("\n").map((para, i) => (
          <p key={i} className="mb-4">
            {para}
          </p>
        ))}
      </div>
      <hr className="my-12" />

      {/* New Comments Section */}
      <Comments
        postId={post.id}
        comments={post.comments}
        userId={session?.user.id}
      />
    </article>
  );
}
