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
