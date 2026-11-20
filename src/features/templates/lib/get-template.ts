import { TEMPLATES, type Template } from "../data/templates"

export function getTemplatePath(template: Pick<Template, "id">) {
  return `/templates/${template.id}`
}

export function getTemplateById(id: string, templates = TEMPLATES) {
  return templates.find((template) => template.id === id)
}

// Same-category templates come first so a reader stays in the topic they chose.
export function getRelatedTemplates(
  template: Template,
  limit = 2,
  templates = TEMPLATES
) {
  const others = templates.filter(({ id }) => id !== template.id)
  const sameCategory = others.filter(
    ({ category }) => category === template.category
  )
  const otherCategories = others.filter(
    ({ category }) => category !== template.category
  )

  return [...sameCategory, ...otherCategories].slice(0, limit)
}

// A Notion template is a shared page, not a file, so it has no extension.
const FORMAT_EXTENSIONS: Record<Template["format"], string | null> = {
  Figma: "fig",
  FigJam: "jam",
  Notion: null,
  "Google Sheets": "xlsx",
}

/** The file's name as the buyer receives it: its own file, else its id in the tool's format. */
export function getTemplateFileName(
  template: Pick<Template, "id" | "format" | "href">
) {
  const fromHref = template.href?.split("/").pop()
  if (fromHref && fromHref.includes(".")) {
    return fromHref
  }

  const extension = FORMAT_EXTENSIONS[template.format]
  return extension ? `${template.id}.${extension}` : template.id
}
