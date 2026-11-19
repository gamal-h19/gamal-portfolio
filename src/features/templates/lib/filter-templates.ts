import type {
  Template,
  TemplateCategory,
  TemplatePricing,
} from "../data/templates"

export type TemplateFilters = {
  query: string
  category: TemplateCategory | "all"
  pricing: TemplatePricing | "all"
}

// Arabic letters have several written forms, so searching "اداره" must still find "إدارة".
export function normalizeSearchText(text: string) {
  return text
    .toLowerCase()
    .replace(/[\u064B-\u0652\u0640]/g, "")
    .replace(/[إأآٱ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/\s+/g, " ")
    .trim()
}

function matchesQuery(template: Template, query: string) {
  const words = normalizeSearchText(query).split(" ").filter(Boolean)
  if (words.length === 0) return true

  const haystack = normalizeSearchText(
    [
      template.title,
      template.description,
      template.format,
      ...template.tags,
    ].join(" ")
  )

  return words.every((word) => haystack.includes(word))
}

export function filterTemplates(
  templates: Template[],
  { query, category, pricing }: TemplateFilters
) {
  return templates.filter(
    (template) =>
      (category === "all" || template.category === category) &&
      (pricing === "all" || template.pricing === pricing) &&
      matchesQuery(template, query)
  )
}
