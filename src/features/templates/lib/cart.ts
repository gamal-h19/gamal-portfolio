import { TEMPLATES, type Template } from "../data/templates"

export function addToCart(ids: string[], id: string) {
  return ids.includes(id) ? ids : [...ids, id]
}

export function removeFromCart(ids: string[], id: string) {
  return ids.filter((item) => item !== id)
}

// The cart comes from localStorage, so anything in it may be stale or tampered with.
export function getCartTemplates(ids: unknown, templates = TEMPLATES) {
  if (!Array.isArray(ids)) {
    return []
  }

  const unique = [...new Set(ids.filter((id) => typeof id === "string"))]

  return unique.flatMap((id) => {
    const template = templates.find((item) => item.id === id)
    return template ? [template] : []
  })
}

export function getTemplatePrice(template: Template) {
  return template.pricing === "paid" ? (template.priceUsd ?? 0) : 0
}

export function getCartTotal(templates: Template[]) {
  return templates.reduce((total, item) => total + getTemplatePrice(item), 0)
}

export function cartNeedsPayment(templates: Template[]) {
  return getCartTotal(templates) > 0
}

export function formatPrice(priceUsd: number) {
  return priceUsd === 0 ? "مجاني" : `${priceUsd}$`
}
