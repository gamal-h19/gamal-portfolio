import type { Metadata, Route } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getTableOfContents } from "fumadocs-core/content/toc"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import type { BlogPosting as PageSchema, WithContext } from "schema-dts"

import { JSON_LD_ID } from "@/config/json-ld"
import { SITE_INFO, X_HANDLE } from "@/config/site"
import { jsonLdBreadcrumbList, JsonLdScript } from "@/lib/json-ld"
import { absoluteUrl } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Kbd } from "@/components/ui/kbd"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Prose } from "@/components/ui/typography"
import { AppLink } from "@/components/app-link"
import { CarbonAds } from "@/components/carbon-ads"
import { MDX } from "@/components/mdx"
import { TOCInline } from "@/components/toc-inline"
import { TOCMinimap } from "@/components/toc-minimap"
import {
  ArticleMeta,
  BlogBackLink,
} from "@/features/blog/components/article-meta"
import { CX_SERIES_TOTAL } from "@/features/blog/cx-series"
import { DocKeyboardShortcuts } from "@/features/doc/components/doc-keyboard-shortcuts"
import {
  DocContainer,
  DocContentCol,
  DocGrid,
  DocLeftCol,
  DocRightCol,
} from "@/features/doc/components/doc-layout"
import { LLMCopyButtonWithViewOptions } from "@/features/doc/components/doc-page-actions"
import { DocPageRoot } from "@/features/doc/components/doc-page-root"
import { DocShareMenu } from "@/features/doc/components/doc-share-menu"
import {
  findNeighbour,
  getBlogPostImage,
  getBlogPosts,
  getDocBySlug,
  normalizeDocDates,
} from "@/features/doc/data/documents"
import type { Doc } from "@/features/doc/types/document"

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = false

type BlogSlugPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const docs = getBlogPosts()
  return docs.map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata({
  params,
}: BlogSlugPageProps): Promise<Metadata> {
  const slug = (await params).slug
  const doc = getDocBySlug(slug)

  if (!doc) {
    return notFound()
  }

  const { title, description, createdAt, updatedAt } = doc.metadata

  const postUrl = `/blog/${doc.slug}`
  const ogImage = getBlogPostImage(doc)
  const dates = normalizeDocDates({ createdAt, updatedAt })

  return {
    title: doc.metadata.seoTitle ?? title,
    description,
    ...(doc.metadata.keywords ? { keywords: doc.metadata.keywords } : {}),
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: doc.metadata.seoTitle ?? title,
      description,
      url: postUrl,
      type: "article",
      publishedTime: dates.createdAt,
      modifiedTime: dates.updatedAt,
      ...(SITE_INFO.url
        ? {
            images: {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: doc.metadata.imageAlt ?? title,
            },
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      site: X_HANDLE,
      creator: X_HANDLE,
      ...(SITE_INFO.url ? { images: [ogImage] } : {}),
    },
  }
}

function getPageJsonLd(doc: Doc): WithContext<PageSchema> {
  const postUrl = `/blog/${doc.slug}`
  const dates = normalizeDocDates(doc.metadata)

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": absoluteUrl(postUrl),
    headline: doc.metadata.title,
    description: doc.metadata.description,
    image: absoluteUrl(getBlogPostImage(doc)),
    url: absoluteUrl(postUrl),
    datePublished: dates.createdAt,
    dateModified: dates.updatedAt,
    author: { "@id": JSON_LD_ID.person },
    mainEntityOfPage: absoluteUrl(postUrl),
    isPartOf: {
      "@type": "Blog",
      "@id": absoluteUrl("/blog"),
      name: "المدونة",
      url: absoluteUrl("/blog"),
    },
  }
}

export default async function Page({ params }: BlogSlugPageProps) {
  const slug = (await params).slug
  const doc = getDocBySlug(slug)

  if (!doc) {
    notFound()
  }

  const coverImage = getBlogPostImage(doc)
  const toc = getTableOfContents(doc.content)

  const allDocs = getBlogPosts()
  const navigationDocs = doc.metadata.seriesId
    ? allDocs
        .filter(
          (post) =>
            post.metadata.seriesId === doc.metadata.seriesId &&
            typeof post.metadata.seriesNumber === "number"
        )
        .sort(
          (a, b) =>
            (a.metadata.seriesNumber ?? 0) - (b.metadata.seriesNumber ?? 0)
        )
    : allDocs
  const { previous, next } = findNeighbour(navigationDocs, slug)

  return (
    <>
      <JsonLdScript data={getPageJsonLd(doc)} />

      <JsonLdScript
        data={jsonLdBreadcrumbList([
          {
            name: "الرئيسية",
            href: "/",
          },
          {
            name: "المدونة",
            href: "/blog",
          },
          {
            name: doc.metadata.title,
            href: `/blog/${slug}`,
          },
        ])}
      />

      <DocKeyboardShortcuts
        previous={previous ? (`/blog/${previous.slug}` as Route) : null}
        next={next ? (`/blog/${next.slug}` as Route) : null}
      />

      <DocPageRoot>
        <DocContainer>
          <div className="screen-line-bottom h-px" />

          <div className="flex items-center justify-between p-2 pl-4">
            <BlogBackLink />

            <div className="flex items-center gap-2">
              <LLMCopyButtonWithViewOptions
                markdownUrl={`/blog/${doc.slug}.md`}
              />

              <Separator orientation="vertical" className="mx-1 h-5" />

              <DocShareMenu
                title={doc.metadata.title}
                url={`/blog/${doc.slug}`}
              />

              {previous && (
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button
                        className="size-7 border-none"
                        variant="secondary"
                        size="icon-sm"
                        nativeButton={false}
                        render={
                          <AppLink
                            href={`/blog/${previous.slug}`}
                            aria-label="المقال السابق"
                          >
                            <ArrowLeftIcon />
                          </AppLink>
                        }
                      />
                    }
                  />
                  <TooltipContent className="pr-2 pl-3">
                    <div className="flex items-center gap-3">
                      المقال السابق
                      <Kbd>
                        <ArrowLeftIcon />
                      </Kbd>
                    </div>
                  </TooltipContent>
                </Tooltip>
              )}

              {next && (
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <Button
                        className="size-7 border-none"
                        variant="secondary"
                        size="icon-sm"
                        nativeButton={false}
                        render={
                          <AppLink
                            href={`/blog/${next.slug}`}
                            aria-label="المقال التالي"
                          >
                            <ArrowRightIcon />
                          </AppLink>
                        }
                      />
                    }
                  />
                  <TooltipContent className="pr-2 pl-3">
                    <div className="flex items-center gap-3">
                      المقال التالي
                      <Kbd>
                        <ArrowRightIcon />
                      </Kbd>
                    </div>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </div>

          <div className="screen-line-top screen-line-bottom py-px">
            <div className="h-4" />
          </div>

          <h1
            data-slot="doc-title"
            className="screen-line-bottom px-4 py-2 text-3xl font-medium tracking-tight text-balance sm:text-4xl"
          >
            {doc.metadata.title}
          </h1>

          <ArticleMeta
            createdAt={doc.metadata.createdAt}
            updatedAt={doc.metadata.updatedAt}
            readingMinutes={Math.max(
              1,
              Math.ceil(doc.content.trim().split(/\s+/u).length / 200)
            )}
            series={
              doc.metadata.seriesId &&
              doc.metadata.seriesTitle &&
              typeof doc.metadata.seriesNumber === "number" &&
              doc.metadata.seriesLevel
                ? {
                    id: doc.metadata.seriesId,
                    title: doc.metadata.seriesTitle,
                    number: doc.metadata.seriesNumber,
                    level: doc.metadata.seriesLevel,
                    total: CX_SERIES_TOTAL,
                  }
                : undefined
            }
          />
        </DocContainer>

        <DocGrid>
          <DocLeftCol />

          <DocContentCol>
            <Prose className="px-(--page-padding) pt-8 [--page-padding:--spacing(4)]">
              <figure className="not-prose mb-8 overflow-hidden rounded-xl border border-line">
                <Image
                  src={coverImage}
                  alt={
                    doc.metadata.imageAlt ??
                    `غلاف المقال: ${doc.metadata.title}`
                  }
                  width={1200}
                  height={630}
                  sizes="(max-width: 768px) calc(100vw - 2rem), 48rem"
                  preload
                  unoptimized={
                    !coverImage.startsWith("/") ||
                    coverImage.startsWith("/og/blog/")
                  }
                  className="aspect-1200/630 h-auto w-full object-cover"
                />
              </figure>

              <p className="text-muted-foreground">
                {doc.metadata.description}
              </p>

              {doc.metadata.ads !== false && (
                <CarbonAds className="not-prose my-[1.25em] flex justify-center" />
              )}

              <TOCInline className="lg:hidden" items={toc} />

              <div>
                <MDX code={doc.content} />
              </div>
            </Prose>

            <div className="screen-line-top h-4" />
          </DocContentCol>

          <DocRightCol>
            <div className="sticky top-[calc(var(--doc-cols-top,0)+(--spacing(3)))] translate-x-2 opacity-0 in-data-doc-cols-ready:opacity-100">
              <TOCMinimap items={toc} />
            </div>
          </DocRightCol>
        </DocGrid>
      </DocPageRoot>
    </>
  )
}
