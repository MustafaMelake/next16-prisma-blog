"use client";

import { toggleLike } from "@/app/actions/post";
import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import { useState } from "react";

export function LikeButton({
  postId,
  initialIsLiked,
  initialCount,
}: {
  postId: number;
  initialIsLiked: boolean;
  initialCount: number;
}) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [count, setCount] = useState(initialCount);

  const handleLike = async () => {
    // Optimistic Update: Change UI before server responds
    setIsLiked(!isLiked);
    setCount(isLiked ? count - 1 : count + 1);

    await toggleLike(postId);
  };

  return (
    <Button variant="ghost" size="sm" onClick={handleLike} className="gap-2">
      <Heart className={isLiked ? "fill-red-500 text-red-500" : ""} size={20} />
      <span>{count}</span>
    </Button>
  );
}
