"use client"

import { ArrowLeftIcon } from "lucide-react"

import { useLanguage } from "@/lib/i18n/language-context"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AppLink } from "@/components/app-link"
import { PostItem } from "@/features/blog/components/post-item"
import type { Doc } from "@/features/doc/types/document"
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "@/features/portfolio/components/panel"
import { PanelTitleCopy } from "@/features/portfolio/components/panel-title-copy"

const ID = "blog"

export function Blog({ posts }: { posts: Pick<Doc, "slug" | "metadata">[] }) {
  const { t } = useLanguage()

  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>{t("blog.title")}</a>
          <PanelTitleSup>({posts.length})</PanelTitleSup>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>

      <div className="relative py-4">
        <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
          <div className="border-r border-line" />
          <div className="border-l border-line" />
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2">
          {posts.slice(0, 4).map((post, index) => (
            <li
              key={post.slug}
              className={cn(
                "relative max-sm:screen-line-top max-sm:screen-line-bottom",
                "sm:border-b sm:border-line",
                index % 2 === 0 ? "sm:border-r sm:pr-4" : "sm:border-l sm:pl-4"
              )}
            >
              <PostItem post={post} headingAs="h3" imageLoading="lazy" />
            </li>
          ))}
        </ul>
      </div>

      <div className="screen-line-top flex justify-center py-4">
        <Button
          className="gap-2 pr-2.5 pl-3 shadow-[inset_0_0_1px] shadow-foreground/20"
          variant="secondary"
          size="sm"
          nativeButton={false}
          render={<AppLink href="/blog" />}
        >
          عرض جميع المقالات
          <ArrowLeftIcon />
        </Button>
      </div>
    </Panel>
  )
}
