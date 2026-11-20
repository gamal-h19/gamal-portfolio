import { describe, expect, it } from "vitest"

import { TEMPLATES } from "../data/templates"
import { filterTemplates, normalizeSearchText } from "./filter-templates"

const noFilters = { query: "", category: "all", pricing: "all" } as const

const ids = (filters: Parameters<typeof filterTemplates>[1]) =>
  filterTemplates(TEMPLATES, filters).map((template) => template.id)

describe("TEMPLATES", () => {
  it("gives every paid template a price", () => {
    for (const template of TEMPLATES) {
      if (template.pricing === "paid") {
        expect(template.priceUsd).toBeGreaterThan(0)
      }
    }
  })

  it("has unique ids", () => {
    const all = TEMPLATES.map((template) => template.id)
    expect(new Set(all).size).toBe(all.length)
  })
})

describe("normalizeSearchText", () => {
  it("unifies Arabic letter forms and strips diacritics", () => {
    expect(normalizeSearchText("إدارةُ  المنتجات")).toBe("اداره المنتجات")
  })
})

describe("filterTemplates", () => {
  it("returns every template without filters", () => {
    expect(ids(noFilters)).toHaveLength(TEMPLATES.length)
  })

  it("filters by category", () => {
    const result = filterTemplates(TEMPLATES, {
      ...noFilters,
      category: "ux",
    })
    expect(result.length).toBeGreaterThan(0)
    expect(result.every((template) => template.category === "ux")).toBe(true)
  })

  it("filters by pricing", () => {
    const result = filterTemplates(TEMPLATES, {
      ...noFilters,
      pricing: "free",
    })
    expect(result.length).toBeGreaterThan(0)
    expect(result.every((template) => template.pricing === "free")).toBe(true)
  })

  it("combines category and pricing", () => {
    expect(
      ids({ ...noFilters, category: "product-management", pricing: "paid" })
    ).toEqual([
      "product-roadmap",
      "opportunity-solution-tree",
      "launch-readiness-checklist",
    ])
  })

  it("searches titles, tags and formats regardless of letter forms", () => {
    expect(ids({ ...noFilters, query: "خارطه الطريق" })).toEqual([
      "product-roadmap",
    ])
    expect(ids({ ...noFilters, query: "rice" })).toEqual([
      "rice-prioritization-matrix",
    ])
    expect(ids({ ...noFilters, query: "figjam" })).toEqual([
      "opportunity-solution-tree",
    ])
  })

  it("requires every search word to match", () => {
    expect(ids({ ...noFilters, query: "مقابلات notion" })).toEqual([
      "user-interview-guide",
    ])
    expect(ids({ ...noFilters, query: "مقابلات figma" })).toEqual([])
  })
})
