import { describe, expect, it } from "vitest"

import {
  addToCart,
  cartNeedsPayment,
  formatPrice,
  getCartTemplates,
  getCartTotal,
  removeFromCart,
} from "./cart"

describe("addToCart", () => {
  it("adds a template once", () => {
    expect(addToCart([], "product-roadmap")).toEqual(["product-roadmap"])
    expect(addToCart(["product-roadmap"], "product-roadmap")).toEqual([
      "product-roadmap",
    ])
  })
})

describe("removeFromCart", () => {
  it("removes the template", () => {
    expect(
      removeFromCart(["product-roadmap", "user-journey-map"], "product-roadmap")
    ).toEqual(["user-journey-map"])
  })
})

describe("getCartTemplates", () => {
  it("drops unknown, duplicate and malformed entries", () => {
    const items = getCartTemplates([
      "product-roadmap",
      "missing",
      42,
      "product-roadmap",
      "user-journey-map",
    ])
    expect(items.map(({ id }) => id)).toEqual([
      "product-roadmap",
      "user-journey-map",
    ])
  })

  it("answers an empty cart for anything that is not a list", () => {
    expect(getCartTemplates("product-roadmap")).toEqual([])
    expect(getCartTemplates(null)).toEqual([])
  })
})

describe("getCartTotal", () => {
  it("sums paid templates and counts free ones as zero", () => {
    const items = getCartTemplates([
      "product-roadmap",
      "competitive-ux-analysis",
      "user-journey-map",
    ])
    expect(getCartTotal(items)).toBe(21)
    expect(cartNeedsPayment(items)).toBe(true)
  })

  it("needs no payment for free templates only", () => {
    const items = getCartTemplates(["user-journey-map"])
    expect(getCartTotal(items)).toBe(0)
    expect(cartNeedsPayment(items)).toBe(false)
  })

  it("is zero for an empty cart", () => {
    expect(getCartTotal([])).toBe(0)
  })
})

describe("formatPrice", () => {
  it("shows free for zero", () => {
    expect(formatPrice(0)).toBe("مجاني")
    expect(formatPrice(12)).toBe("12$")
  })
})
