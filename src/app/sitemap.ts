import type { MetadataRoute } from "next"

import { SITE_INFO } from "@/config/site"
import { getBlogPosts } from "@/features/doc/data/documents"
import { CASE_STUDIES } from "@/features/portfolio/data/case-studies"

export const revalidate = false
export const dynamic = "force-static"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!SITE_INFO.url) {
    return []
  }

  const toUrl = (path: string) => new URL(path, SITE_INFO.url).toString()
  const posts = getBlogPosts().map((post) => ({
    url: toUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.metadata.updatedAt).toISOString(),
  }))

  const caseStudies = CASE_STUDIES.map((study) => ({
    url: toUrl(`/case-studies/${study.slug}`),
    lastModified: new Date().toISOString(),
  }))

  const paths = [
    "",
    "/about",
    "/case-studies",
    "/blog",
    "/templates",
    "/newsletter",
    "/consultation",
    "/contact",
  ]
  const routes = paths.map((path) => ({
    url: toUrl(path || "/"),
    lastModified: new Date().toISOString(),
  }))

  return [...routes, ...caseStudies, ...posts]
}
