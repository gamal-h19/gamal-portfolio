import { Suspense } from "react"
import type { Metadata } from "next"
import type { Blog, WithContext } from "schema-dts"

import { JSON_LD_ID } from "@/config/json-ld"
import { SITE_INFO, X_HANDLE } from "@/config/site"
import { jsonLdBreadcrumbList, JsonLdScript } from "@/lib/json-ld"
import { absoluteUrl } from "@/lib/utils"
import { getBlogPosts } from "@/features/doc/data/documents"

import { BlogPageContent } from "./blog-page-content"

const title = "المدونة | جمال حسن"
const description =
  "مقالات من تجربة عملية في تصميم تجربة المستخدم وأبحاث المستخدمين واستراتيجية المنتجات الرقمية."

const ogImage = `/og/simple?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/blog",
  },
  keywords: [
    "المدونة",
    "جمال حسن",
    "UX blog",
    "product design",
    "user research",
    "digital products",
    "case studies",
  ],
  openGraph: {
    title,
    description,
    url: "/blog",
    type: "website",
    ...(SITE_INFO.url
      ? {
          images: {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: title,
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

function getBlogJsonLd(
  posts: { slug: string; metadata: { title: string; createdAt: string } }[]
): WithContext<Blog> {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": absoluteUrl("/blog"),
    name: title,
    description,
    url: absoluteUrl("/blog"),
    isPartOf: { "@id": JSON_LD_ID.website },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      "@id": absoluteUrl(`/blog/${post.slug}`),
      headline: post.metadata.title,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: new Date(post.metadata.createdAt).toISOString(),
    })),
  }
}

export default function Page() {
  const allPosts = getBlogPosts()

  return (
    <>
      <JsonLdScript data={getBlogJsonLd(allPosts)} />

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
        ])}
      />

      <Suspense fallback={<div className="min-h-svh" />}>
        <BlogPageContent
          posts={allPosts.map(({ slug, metadata }) => ({ slug, metadata }))}
        />
      </Suspense>
    </>
  )
}
