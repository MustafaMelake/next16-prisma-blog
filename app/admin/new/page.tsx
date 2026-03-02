import { createPost } from "@/app/actions/post";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";

export default function NewPostPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-2xl mx-auto shadow-lg border-primary/10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold">
            Write a New Story
          </CardTitle>
          <CardDescription>
            Share your knowledge and ideas with the world.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createPost} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="Give your story an catchy title..."
                className="text-lg py-6"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="text-base">
                Content
              </Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Tell your story..."
                rows={12}
                className="text-base leading-relaxed resize-none"
                required
              />
            </div>

            <div className="flex gap-3 justify-end pt-6 border-t">
              <Link href="/admin">
                <Button variant="ghost" type="button" className="px-8">
                  Cancel
                </Button>
              </Link>
              <Button type="submit" className="px-8">
                Publish Now
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
