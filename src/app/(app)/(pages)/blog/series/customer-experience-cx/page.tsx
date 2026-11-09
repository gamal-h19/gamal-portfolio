import type { Metadata } from "next"
import type { CollectionPage, WithContext } from "schema-dts"

import { jsonLdBreadcrumbList, JsonLdScript } from "@/lib/json-ld"
import { absoluteUrl } from "@/lib/utils"
import { AppLink } from "@/components/app-link"
import {
  PageHeading,
  PageHeadingTagline,
  PageHeadingTitle,
} from "@/components/page-heading"
import {
  CX_SERIES_ARTICLES,
  CX_SERIES_DESCRIPTION,
  CX_SERIES_ID,
  CX_SERIES_LEVELS,
  CX_SERIES_TITLE,
} from "@/features/blog/cx-series"
import { getBlogPosts } from "@/features/doc/data/documents"

export const metadata: Metadata = {
  title: CX_SERIES_TITLE,
  description: CX_SERIES_DESCRIPTION,
  alternates: {
    canonical: `/blog/series/${CX_SERIES_ID}`,
  },
  openGraph: {
    title: CX_SERIES_TITLE,
    description: CX_SERIES_DESCRIPTION,
    url: `/blog/series/${CX_SERIES_ID}`,
    type: "website",
  },
}

function getSeriesJsonLd(): WithContext<CollectionPage> {
  const publishedSlugs = new Set(getBlogPosts().map((post) => post.slug))

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": absoluteUrl(`/blog/series/${CX_SERIES_ID}`),
    name: CX_SERIES_TITLE,
    description: CX_SERIES_DESCRIPTION,
    url: absoluteUrl(`/blog/series/${CX_SERIES_ID}`),
    hasPart: CX_SERIES_ARTICLES.filter((article) =>
      publishedSlugs.has(article.slug)
    ).map((article) => ({
      "@type": "BlogPosting",
      "@id": absoluteUrl(`/blog/${article.slug}`),
      headline: article.title,
      url: absoluteUrl(`/blog/${article.slug}`),
    })),
  }
}

export default function CXSeriesPage() {
  const publishedPosts = new Set(getBlogPosts().map((post) => post.slug))

  return (
    <main dir="rtl" className="min-h-svh">
      <JsonLdScript data={getSeriesJsonLd()} />
      <JsonLdScript
        data={jsonLdBreadcrumbList([
          { name: "الرئيسية", href: "/" },
          { name: "المدونة", href: "/blog" },
          {
            name: CX_SERIES_TITLE,
            href: `/blog/series/${CX_SERIES_ID}`,
          },
        ])}
      />

      <PageHeading>
        <PageHeadingTagline>مسار تعليمي من 17 مقالًا</PageHeadingTagline>
        <PageHeadingTitle>
          دليل تجربة العميل <bdi dir="ltr">(Customer Experience – CX)</bdi>
        </PageHeadingTitle>
      </PageHeading>

      <p className="mx-auto max-w-3xl px-4 py-8 text-muted-foreground">
        {CX_SERIES_DESCRIPTION}
      </p>

      <div className="space-y-10 px-4 pb-16">
        {CX_SERIES_LEVELS.map((level) => {
          const articles = CX_SERIES_ARTICLES.filter(
            (article) => article.level === level.level
          ).filter((article) => publishedPosts.has(article.slug))

          if (articles.length === 0) return null

          return (
            <section key={level.level} aria-labelledby={`level-${level.level}`}>
              <div className="mb-4 border-b border-line pb-3">
                <p className="font-mono text-xs text-muted-foreground">
                  {level.level}
                </p>
                <h2
                  id={`level-${level.level}`}
                  className="mt-1 text-xl font-medium"
                >
                  {level.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {level.description}
                </p>
              </div>

              <ol className="grid gap-3 md:grid-cols-2">
                {articles.map((article) => (
                  <li
                    key={article.slug}
                    className="rounded-xl border border-line p-4 transition-colors hover:bg-muted/40"
                  >
                    <AppLink
                      href={`/blog/${article.slug}`}
                      className="block focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                      <span className="font-mono text-xs text-muted-foreground">
                        {String(article.number).padStart(2, "0")} / 17
                      </span>
                      <h3 className="mt-2 font-medium">{article.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {article.description}
                      </p>
                    </AppLink>
                  </li>
                ))}
              </ol>
            </section>
          )
        })}
      </div>
    </main>
  )
}
