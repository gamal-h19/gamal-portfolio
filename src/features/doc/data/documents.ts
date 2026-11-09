import fs from "fs"
import path from "path"
import { cache } from "react"
import matter from "gray-matter"

import { CX_SERIES_ARTICLES, CX_SERIES_ID } from "@/features/blog/cx-series"
import type { Doc, DocMetadata } from "@/features/doc/types/document"

function parseFrontmatter(fileContent: string) {
  const file = matter(fileContent)

  return {
    metadata: normalizeDocDates(file.data),
    content: file.content,
  }
}

function parseDate(value: unknown) {
  if (typeof value !== "string" && !(value instanceof Date)) {
    return undefined
  }

  const date = value instanceof Date ? value : new Date(value)

  return Number.isNaN(date.getTime()) ? undefined : date
}

export function normalizeDocDates(
  metadata: Record<string, unknown>
): DocMetadata {
  const createdAt =
    parseDate(metadata.createdAt) ?? parseDate(metadata.updatedAt) ?? new Date()
  const updatedAt = parseDate(metadata.updatedAt) ?? createdAt

  return {
    ...metadata,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
  } as DocMetadata
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx")
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, "utf-8")
  return parseFrontmatter(rawContent)
}

/**
 * Reads MDX docs from `dir`, grouping them by their immediate subfolder.
 * The subfolder name is the doc's category (e.g. `content/components/*.mdx`
 * yields docs with `category: "components"`), so category is derived from the
 * file location rather than declared in frontmatter. Files placed directly in
 * `dir` (e.g. shared `props.ts`) are ignored — only category folders are read.
 */
function getMDXData(dir: string) {
  const categoryDirs = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())

  return categoryDirs.flatMap((categoryDir) => {
    const category = categoryDir.name
    const categoryPath = path.join(dir, category)

    return getMDXFiles(categoryPath).map<Doc>((file) => {
      const { metadata, content } = readMDXFile(path.join(categoryPath, file))

      const slug = path.basename(file, path.extname(file))

      return {
        metadata: { ...metadata, category },
        slug,
        content,
      }
    })
  })
}

export const getAllDocs = cache(() => {
  return getMDXData(path.join(process.cwd(), "src/features/doc/content")).sort(
    (a, b) => {
      if (a.metadata.pinned && !b.metadata.pinned) return -1
      if (!a.metadata.pinned && b.metadata.pinned) return 1

      return (
        new Date(b.metadata.createdAt).getTime() -
        new Date(a.metadata.createdAt).getTime()
      )
    }
  )
})

export function getDocBySlug(slug: string) {
  return getAllDocs().find((doc) => doc.slug === slug)
}

export function getDocsByCategory(category: string) {
  return getAllDocs().filter((doc) => doc.metadata?.category === category)
}

/** Categories derived from the doc's content subfolder. */
export const BLOG_CATEGORY = "blog"
export const COMPONENTS_CATEGORY = "components"

export const BLOG_POST_SLUGS = [
  "problem-solving-ux-design",
  "welcome",
  "understand-the-real-user-problem-before-starting-design",
  "from-user-interviews-to-product-decisions",
  "how-to-map-the-user-journey-and-identify-experience-friction",
  "how-to-design-an-effective-onboarding-experience",
  "how-to-prioritize-product-development-without-wasting-team-time",
  "understanding-business-before-building-products",
  "aligning-business-and-customer-goals",
  "designing-ai-features-from-user-needs-to-trustworthy-experiences",
  "product-discovery-how-to-find-the-right-problem-before-building",
  "ux-research-practical-guide-to-understanding-users",
  "from-feedback-to-product-decisions",
  "mvp-prioritization-how-to-build-a-testable-product-without-wasting-resources",
  "product-led-growth-how-the-product-drives-acquisition-and-retention",
  "customer-journey-mapping-how-to-find-friction-points",
  "ai-in-product-design-using-ai-without-losing-design-thinking",
  "product-market-fit-why-good-ux-is-not-enough",
  "contextual-inquiry-why-you-should-watch-users-while-they-work",
  "product-analytics-how-to-know-what-happens-inside-your-product",
  "experimentation-and-ab-testing-how-to-test-product-decisions-with-evidence",
  "accessibility-and-inclusive-design-how-to-design-for-everyone",
  "design-systems-how-to-build-a-scalable-design-system",
  "service-design-and-service-blueprint-beyond-the-interface",
  "product-roadmapping-how-to-move-from-vision-to-execution",
  "user-onboarding-and-product-adoption-how-to-help-users-reach-value",
  "feature-success-vs-product-success",
  "building-product-roadmap-aligned-with-business-goals",
  "how-to-define-mvp-scope",
  "how-to-conduct-effective-user-interviews",
  ...CX_SERIES_ARTICLES.map((article) => article.slug),
]

/** Blog posts — docs under the `blog/` content folder. */
export function getBlogPosts() {
  const posts = getDocsByCategory(BLOG_CATEGORY)
    .filter((doc) => BLOG_POST_SLUGS.includes(doc.slug))
    .sort((a, b) => {
      const dateDifference =
        new Date(b.metadata.createdAt).getTime() -
        new Date(a.metadata.createdAt).getTime()
      if (dateDifference !== 0) return dateDifference

      const aIsInSeries = a.metadata.seriesId === CX_SERIES_ID
      const bIsInSeries = b.metadata.seriesId === CX_SERIES_ID

      if (aIsInSeries && bIsInSeries) {
        return (a.metadata.seriesNumber ?? 0) - (b.metadata.seriesNumber ?? 0)
      }
      if (aIsInSeries) return 1
      if (bIsInSeries) return -1

      return 0
    })
  const imageCounts = new Map<string, number>()

  for (const post of posts) {
    const image = post.metadata.image

    if (image) {
      imageCounts.set(image, (imageCounts.get(image) ?? 0) + 1)
    }
  }

  return posts.map((post) => {
    const image = post.metadata.image
    const resolvedImage = image?.startsWith("/og/simple")
      ? `/images/blog/${post.slug}.svg`
      : image

    return {
      ...post,
      metadata: {
        ...post.metadata,
        image:
          !image || (imageCounts.get(image) ?? 0) > 1
            ? `/og/blog/${post.slug}`
            : resolvedImage,
      },
    }
  })
}

export function getBlogPostImage(post: Pick<Doc, "slug" | "metadata">) {
  return (
    getBlogPosts().find((blogPost) => blogPost.slug === post.slug)?.metadata
      .image ?? `/og/blog/${post.slug}`
  )
}

/** Component docs — docs under the `components/` content folder. */
export function getComponentDocs() {
  return getDocsByCategory(COMPONENTS_CATEGORY)
}

export function findNeighbour(docs: Doc[], slug: string) {
  const len = docs.length

  for (let i = 0; i < len; ++i) {
    if (docs[i].slug === slug) {
      return {
        previous: i > 0 ? docs[i - 1] : null,
        next: i < len - 1 ? docs[i + 1] : null,
      }
    }
  }

  return { previous: null, next: null }
}
