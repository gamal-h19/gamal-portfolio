import type { ImageProps } from "next/image"
import Image from "next/image"

import { useLanguage } from "@/lib/i18n/language-context"
import { AppLink } from "@/components/app-link"
import type { Doc } from "@/features/doc/types/document"

type HeadingTypes = "h2" | "h3" | "h4"

function getCardImage(post: Pick<Doc, "slug" | "metadata">) {
  return post.metadata.image ?? `/og/blog/${post.slug}`
}

export function PostItem({
  post,
  headingAs,
  imageLoading = "lazy",
}: {
  post: Pick<Doc, "slug" | "metadata">
  headingAs?: HeadingTypes
  imageLoading?: ImageProps["loading"]
}) {
  const { t } = useLanguage()
  const Heading = headingAs ?? "h2"
  const publishedAt = new Date(post.metadata.createdAt)
  const publishedDate = new Intl.DateTimeFormat("ar-EG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    calendar: "gregory",
    timeZone: "UTC",
  }).format(publishedAt)

  const cardImage = getCardImage(post)
  const altText = `غلاف المقال: ${post.metadata.title}`

  return (
    <div className="group/post relative z-0 flex h-full flex-col gap-2 p-2 transition-[background-color] ease-out hover:bg-accent-muted">
      {cardImage && (
        <div className="relative z-0 select-none [--image-radius:var(--radius-xl)]">
          <Image
            className="aspect-1200/630 rounded-(--image-radius) grayscale transition-[filter] duration-300 ease-[cubic-bezier(0.42,0,0.58,1)] group-hover/post:grayscale-0"
            src={cardImage}
            alt={altText}
            width={1200}
            height={630}
            quality={100}
            loading={imageLoading}
            unoptimized
          />
          <div className="pointer-events-none absolute inset-0 rounded-(--image-radius) inset-ring-1 inset-ring-black/15 dark:inset-ring-white/15" />
        </div>
      )}

      <div className="flex flex-col gap-1 p-2">
        <Heading className="text-lg/snug font-medium text-balance">
          <AppLink href={`/blog/${post.slug}`}>
            <span className="absolute inset-0" aria-hidden />
            {post.metadata.title}
          </AppLink>

          {(post.metadata.new || post.metadata.updated) && (
            <span className="pointer-events-none ml-2 inline-block size-1.5 -translate-y-px rounded-full bg-info">
              <span className="sr-only">
                {post.metadata.new
                  ? ` (${t("blog.new")})`
                  : ` (${t("blog.updated")})`}
              </span>
            </span>
          )}
        </Heading>

        <dl>
          <dt className="sr-only">{t("blog.publishedOn")}</dt>
          <dd className="text-sm text-muted-foreground">
            <time dateTime={new Date(post.metadata.createdAt).toISOString()}>
              {publishedDate}
            </time>
          </dd>
        </dl>
      </div>
    </div>
  )
}
