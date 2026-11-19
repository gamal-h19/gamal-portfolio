import { useSyncExternalStore } from "react"
import { parseAsString, parseAsStringLiteral, useQueryStates } from "nuqs"

import { TEMPLATE_CATEGORIES, TEMPLATE_PRICING } from "../data/templates"
import type { TemplateFilters } from "../lib/filter-templates"

const subscribeNothing = () => () => {}

const filterParsers = {
  q: parseAsString.withDefault(""),
  category: parseAsStringLiteral([
    "all",
    ...TEMPLATE_CATEGORIES.map(({ value }) => value),
  ]).withDefault("all"),
  pricing: parseAsStringLiteral([
    "all",
    ...TEMPLATE_PRICING.map(({ value }) => value),
  ]).withDefault("all"),
}

const DEFAULT_FILTERS: TemplateFilters = {
  query: "",
  category: "all",
  pricing: "all",
}

export function useTemplateFilters() {
  const isHydrated = useSyncExternalStore(
    subscribeNothing,
    () => true,
    () => false
  )
  const [state, setState] = useQueryStates(filterParsers)

  const filters: TemplateFilters = isHydrated
    ? { query: state.q, category: state.category, pricing: state.pricing }
    : DEFAULT_FILTERS

  return {
    filters,
    setQuery: (query: string | null) => setState({ q: query || null }),
    setCategory: (category: TemplateFilters["category"]) =>
      setState({ category }),
    setPricing: (pricing: TemplateFilters["pricing"]) => setState({ pricing }),
    resetFilters: () => setState({ q: null, category: null, pricing: null }),
  }
}
