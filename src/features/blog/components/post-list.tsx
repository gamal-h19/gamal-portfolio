import { useLanguage } from "@/lib/i18n/language-context"
import { LinedGrid, LinedGridItem } from "@/components/lined-grid"
import type { Doc } from "@/features/doc/types/document"

import { PostItem } from "./post-item"

export function PostList({
  posts,
  className,
}: {
  posts: Pick<Doc, "slug" | "metadata">[]
  className?: string
}) {
  const { t } = useLanguage()

  return (
    <LinedGrid className={className}>
      {posts.map((post, index) => (
        <LinedGridItem key={post.slug}>
          <PostItem post={post} imageLoading={index <= 3 ? "eager" : "lazy"} />
        </LinedGridItem>
      ))}

      {posts.length === 0 && (
        <LinedGridItem className="col-span-full p-4">
          <p className="font-mono text-sm">{t("blog.noResults")}</p>
        </LinedGridItem>
      )}
    </LinedGrid>
  )
}
