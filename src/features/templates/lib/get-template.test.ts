import { describe, expect, it } from "vitest"

import { TEMPLATES } from "../data/templates"
import {
  getRelatedTemplates,
  getTemplateById,
  getTemplateFileName,
  getTemplatePath,
} from "./get-template"

describe("getTemplateById", () => {
  it("finds a template by its id", () => {
    expect(getTemplateById("product-roadmap")?.title).toBe("خارطة طريق المنتج")
  })

  it("answers undefined for an unknown id", () => {
    expect(getTemplateById("missing")).toBeUndefined()
  })
})

describe("getTemplatePath", () => {
  it("builds the template's page path", () => {
    expect(getTemplatePath({ id: "product-roadmap" })).toBe(
      "/templates/product-roadmap"
    )
  })
})

describe("getRelatedTemplates", () => {
  it("never includes the template itself", () => {
    for (const template of TEMPLATES) {
      expect(getRelatedTemplates(template, 20)).not.toContainEqual(template)
    }
  })

  it("prefers templates of the same category", () => {
    const template = getTemplateById("user-journey-map")!
    const related = getRelatedTemplates(template)

    expect(related).toHaveLength(2)
    expect(related.every(({ category }) => category === "ux")).toBe(true)
  })

  it("fills up with other categories when the same one runs out", () => {
    const [first, second] = TEMPLATES
    const templates = [
      first,
      {
        ...second,
        category: first.category === "ux" ? "product-management" : "ux",
      } as const,
    ]

    expect(getRelatedTemplates(first, 2, templates)).toEqual([templates[1]])
  })
})

describe("template details", () => {
  it("gives every template an overview, contents, benefits and audience", () => {
    for (const template of TEMPLATES) {
      expect(template.overview.length).toBeGreaterThan(0)
      expect(template.contents.length).toBeGreaterThan(0)
      expect(template.benefits.length).toBeGreaterThan(0)
      expect(template.audience.length).toBeGreaterThan(0)
    }
  })
})

describe("getTemplateFileName", () => {
  it("uses the template's own file", () => {
    expect(
      getTemplateFileName(getTemplateById("heuristic-evaluation-checklist")!)
    ).toBe("heuristic-evaluation-checklist.xlsx")
  })

  it("names a template without a file after its tool", () => {
    expect(getTemplateFileName(getTemplateById("user-journey-map")!)).toBe(
      "user-journey-map.fig"
    )
    expect(getTemplateFileName(getTemplateById("product-roadmap")!)).toBe(
      "product-roadmap.xlsx"
    )
  })
})
