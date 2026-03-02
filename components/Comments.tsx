"use client";

import { useRef, useTransition } from "react";
import { addComment, deleteComment } from "@/app/actions/post";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Trash2, MessageSquare, Loader2 } from "lucide-react";

// Matches the Prisma 'include' structure
interface CommentWithUser {
  id: number;
  content: string;
  createdAt: Date;
  userId: string;
  user: {
    id: string;
    name: string;
    image?: string | null;
  };
}

interface CommentsProps {
  postId: number;
  comments: CommentWithUser[];
  userId?: string; // The ID of the currently logged-in user
}

export function Comments({ postId, comments, userId }: CommentsProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  const handlePostComment = async (formData: FormData) => {
    startTransition(async () => {
      await addComment(formData);
      formRef.current?.reset();
    });
  };

  return (
    <div className="mt-12 space-y-8 border-t pt-10">
      <div className="flex items-center gap-2">
        <MessageSquare className="h-6 w-6" />
        <h3 className="text-2xl font-bold">Comments ({comments.length})</h3>
      </div>

      {/* Comment Form */}
      {userId ? (
        <form ref={formRef} action={handlePostComment} className="space-y-4">
          <input type="hidden" name="postId" value={postId} />
          <Textarea
            name="content"
            placeholder="Write a thoughtful comment..."
            className="min-h-[100px] bg-muted/50 focus-visible:ring-primary"
            required
          />
          <Button type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Posting...
              </>
            ) : (
              "Post Comment"
            )}
          </Button>
        </form>
      ) : (
        <div className="bg-muted p-6 rounded-xl border text-center">
          <p className="text-muted-foreground">
            Please log in to join the conversation.
          </p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-8 mt-10">
        {comments.length === 0 && (
          <p className="text-center text-muted-foreground py-10">
            No comments yet. Be the first to share your thoughts!
          </p>
        )}

        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 group">
            <Avatar className="h-10 w-10 border">
              <AvatarImage src={comment.user.image ?? undefined} />
              <AvatarFallback>{comment.user.name?.[0] || "?"}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                  <span className="font-semibold text-sm">
                    {comment.user.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(comment.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {/* Trash Button - Only visible if current user owns the comment */}
                {userId === comment.userId && (
                  <button
                    onClick={() => {
                      if (confirm("Delete this comment permanently?")) {
                        startTransition(() => deleteComment(comment.id));
                      }
                    }}
                    /* Removed opacity-0 and added visible colors */
                    className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors border border-red-100"
                    title="Delete Comment"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="text-sm leading-relaxed text-foreground/80 bg-muted/30 p-3 rounded-lg border border-transparent group-hover:border-muted transition-colors">
                {comment.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
