import { useSyncExternalStore } from "react"
import { useQueryState } from "nuqs"

const subscribeNothing = () => () => {}

export const BLOG_FILTERS = [
  { value: "all", label: "الكل" },
  { value: "ux", label: "UX" },
  { value: "product", label: "المنتج" },
  { value: "research", label: "البحث" },
  { value: "growth", label: "النمو" },
  { value: "ai", label: "الذكاء الاصطناعي" },
  { value: "strategy", label: "الاستراتيجية" },
] as const

export type BlogFilterValue = (typeof BLOG_FILTERS)[number]["value"]

export function useSearchQuery() {
  const isHydrated = useSyncExternalStore(
    subscribeNothing,
    () => true,
    () => false
  )
  const [query, setQuery] = useQueryState("q", {
    defaultValue: "",
  })

  const [category, setCategory] = useQueryState("category", {
    defaultValue: "all",
  })

  return {
    query: isHydrated ? query : "",
    setQuery,
    category: isHydrated ? category : "all",
    setCategory,
  }
}
