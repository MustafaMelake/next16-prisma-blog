"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  const session = await getSession();

  // 1. Security Check
  if (!session) {
    throw new Error("Unauthorized");
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  // 2. Database Write
  await prisma.post.create({
    data: {
      title,
      content,
      authorId: session.user.id, // Links the post to the logged-in user
    },
  });

  // 3. Cleanup & Redirect
  revalidatePath("/admin"); // Refresh the dashboard data
  redirect("/admin"); // Send the user back
}

export async function deletePost(formData: FormData) {
  const session = await getSession();
  const id = Number(formData.get("id"));

  if (!session) throw new Error("Unauthorized");

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) throw new Error("Post not found");

  const isAdmin = session.user.role === "ADMIN";
  const isOwner = post.authorId === session.user.id;

  if (!isAdmin && !isOwner) {
    throw new Error("You don't have permission to delete this post");
  }

  await prisma.post.delete({ where: { id } });
  revalidatePath("/admin");
}

export async function updatePost(formData: FormData) {
  const session = await getSession();
  const id = Number(formData.get("id"));
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!session) throw new Error("Unauthorized");

  await prisma.post.update({
    where: {
      id,
      authorId: session.user.id,
    },
    data: { title, content },
  });

  revalidatePath("/admin");
  redirect("/admin");
}

export async function togglePublish(postId: number, currentStatus: boolean) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  await prisma.post.update({
    where: {
      id: postId,
      authorId: session.user.id,
    },
    data: {
      published: !currentStatus,
    },
  });

  revalidatePath("/admin");
}
export async function toggleLike(postId: number) {
  const session = await getSession();
  if (!session) throw new Error("You must be logged in to like posts");

  const userId = session.user.id;

  // Check if like already exists
  const existingLike = await prisma.like.findUnique({
    where: {
      userId_postId: { userId, postId },
    },
  });

  if (existingLike) {
    await prisma.like.delete({
      where: { id: existingLike.id },
    });
  } else {
    await prisma.like.create({
      data: { userId, postId },
    });
  }

  revalidatePath("/"); // Refresh home page
  revalidatePath(`/posts/${postId}`); // Refresh single post page
}
export async function addComment(formData: FormData) {
  const session = await getSession();
  if (!session) throw new Error("Must be logged in to comment");

  const content = formData.get("content") as string;
  const postId = Number(formData.get("postId"));

  await prisma.comment.create({
    data: {
      content,
      postId,
      userId: session.user.id,
    },
  });

  revalidatePath(`/posts/${postId}`);
}

export async function deleteComment(commentId: number) {
  const session = await getSession(); // Your auth helper
  if (!session) throw new Error("Unauthorized");

  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment) return;

  // Security check: Only the owner can delete
  if (comment.userId !== session.user.id) {
    throw new Error("Unauthorized: You don't own this comment");
  }

  await prisma.comment.delete({
    where: { id: commentId },
  });

  revalidatePath(`/posts/${comment.postId}`);
}
