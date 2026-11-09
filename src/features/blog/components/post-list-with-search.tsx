"use client"

import type { Doc } from "@/features/doc/types/document"

import { useFilteredPosts } from "../hooks/use-filtered-posts"
import { PostList } from "./post-list"

export function PostListWithSearch({
  posts,
  className,
}: {
  posts: Pick<Doc, "slug" | "metadata">[]
  className?: string
}) {
  const filteredPosts = useFilteredPosts(posts)
  return <PostList posts={filteredPosts} className={className} />
}
