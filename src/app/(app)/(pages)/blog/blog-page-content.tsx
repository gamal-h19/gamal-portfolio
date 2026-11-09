"use client"

import { Suspense } from "react"
import type { ReactNode } from "react"

import { useLanguage } from "@/lib/i18n/language-context"
import { Button } from "@/components/ui/button"
import {
  PageHeading,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"
import { PostList } from "@/features/blog/components/post-list"
import { PostListWithSearch } from "@/features/blog/components/post-list-with-search"
import { PostSearchInput } from "@/features/blog/components/post-search-input"
import {
  BLOG_FILTERS,
  useSearchQuery,
} from "@/features/blog/hooks/use-search-query"
import type { Doc } from "@/features/doc/types/document"

export function BlogPageContent({
  posts,
  children,
}: {
  posts: Pick<Doc, "slug" | "metadata">[]
  children?: ReactNode
}) {
  const { t } = useLanguage()
  const { category, setCategory } = useSearchQuery()

  return (
    <div dir="rtl" className="min-h-svh">
      <PageHeading>
        <PageHeadingTagline>{t("blog.title")}</PageHeadingTagline>
        <PageHeadingTitle>{t("blog.description")}</PageHeadingTitle>
      </PageHeading>

      <div className="screen-line-bottom p-3 after:z-20">
        <Suspense
          fallback={
            <div className="flex h-9 w-full rounded-lg border border-input dark:bg-input/30" />
          }
        >
          <PostSearchInput />
        </Suspense>

        <div className="mt-3 flex flex-wrap gap-2">
          {BLOG_FILTERS.map((filter) => {
            const isActive = category === filter.value

            return (
              <Button
                key={filter.value}
                type="button"
                size="sm"
                variant={isActive ? "default" : "secondary"}
                className="h-8 rounded-full px-3 text-xs"
                onClick={() => setCategory(filter.value)}
                aria-pressed={isActive}
              >
                {filter.label}
              </Button>
            )
          })}
        </div>
      </div>

      <Suspense fallback={<PostList posts={posts} />}>
        <PostListWithSearch posts={posts} />
      </Suspense>

      {children}
    </div>
  )
}
