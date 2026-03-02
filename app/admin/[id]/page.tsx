import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";
import { updatePost } from "@/app/actions/post";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { redirect } from "next/navigation";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: PageProps) {
  const session = await getSession();
  const { id } = await params;
  const postId = Number(id);

  if (isNaN(postId)) redirect("/admin");

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post || post.authorId !== session?.user.id) {
    redirect("/admin");
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Link
          href="/admin"
          className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Edit Story</CardTitle>
            <CardDescription>
              Update your content, title, and settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={updatePost} className="space-y-6">
              <input type="hidden" name="id" value={post.id} />

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={post.title}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  defaultValue={post.content}
                  rows={12}
                  className="resize-none"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t">
                <Link href="/admin">
                  <Button variant="ghost" type="button">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit">Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
