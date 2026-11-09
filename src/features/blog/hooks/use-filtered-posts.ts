import type { Doc } from "@/features/doc/types/document"

import { useSearchQuery, type BlogFilterValue } from "./use-search-query"

const normalize = (text: string) => text.toLowerCase().replaceAll(" ", "")

type PostPreview = Pick<Doc, "slug" | "metadata">

const getPostCategories = (post: PostPreview): BlogFilterValue[] => {
  const haystack = `${post.slug} ${post.metadata.title}`.toLowerCase()
  const categories = new Set<BlogFilterValue>()

  if (
    haystack.includes("ux") ||
    haystack.includes("design") ||
    haystack.includes("journey") ||
    haystack.includes("onboarding") ||
    haystack.includes("accessibility") ||
    haystack.includes("system") ||
    haystack.includes("service")
  ) {
    categories.add("ux")
  }

  if (
    haystack.includes("product") ||
    haystack.includes("roadmap") ||
    haystack.includes("mvp") ||
    haystack.includes("discovery") ||
    haystack.includes("market") ||
    haystack.includes("analytics") ||
    haystack.includes("experiment") ||
    haystack.includes("priorit")
  ) {
    categories.add("product")
  }

  if (
    haystack.includes("research") ||
    haystack.includes("interview") ||
    haystack.includes("feedback") ||
    haystack.includes("context") ||
    haystack.includes("user")
  ) {
    categories.add("research")
  }

  if (
    haystack.includes("growth") ||
    haystack.includes("retention") ||
    haystack.includes("acquisition") ||
    haystack.includes("adoption")
  ) {
    categories.add("growth")
  }

  if (haystack.includes("ai") || haystack.includes("artificial")) {
    categories.add("ai")
  }

  if (
    haystack.includes("strategy") ||
    haystack.includes("roadmap") ||
    haystack.includes("market") ||
    haystack.includes("priorit") ||
    haystack.includes("discovery")
  ) {
    categories.add("strategy")
  }

  if (categories.size === 0) {
    categories.add("product")
  }

  return [...categories]
}

const matchesQuery = (post: PostPreview, normalizedQuery: string) => {
  const normalizedTitle = normalize(post.metadata.title)
  const normalizedDescription = normalize(post.metadata.description)

  return (
    normalizedTitle.includes(normalizedQuery) ||
    normalizedDescription.includes(normalizedQuery)
  )
}

const matchesCategory = (post: PostPreview, category: string | null) => {
  if (!category || category === "all") return true
  return getPostCategories(post).includes(category as BlogFilterValue)
}

const searchPosts = (posts: PostPreview[], query: string | null) => {
  if (!query) return posts

  const normalizedQuery = normalize(query)
  return posts.filter((post) => matchesQuery(post, normalizedQuery))
}

export function useFilteredPosts(posts: PostPreview[]) {
  const { query, category } = useSearchQuery()
  return searchPosts(posts, query).filter((post) =>
    matchesCategory(post, category)
  )
}
