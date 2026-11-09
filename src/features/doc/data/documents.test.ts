import { describe, expect, it } from "vitest"

import {
  findNeighbour,
  getBlogPostImage,
  getBlogPosts,
  getDocBySlug,
  normalizeDocDates,
} from "@/features/doc/data/documents"
import type { Doc } from "@/features/doc/types/document"

const docs = [{ slug: "a" }, { slug: "b" }, { slug: "c" }] as unknown as Doc[]

describe("findNeighbour", () => {
  it("returns previous and next for a middle item", () => {
    const result = findNeighbour(docs, "b")
    expect(result.previous?.slug).toBe("a")
    expect(result.next?.slug).toBe("c")
  })

  it("returns null previous and a next for the first item", () => {
    const result = findNeighbour(docs, "a")
    expect(result.previous).toBeNull()
    expect(result.next?.slug).toBe("b")
  })

  it("returns a previous and null next for the last item", () => {
    const result = findNeighbour(docs, "c")
    expect(result.previous?.slug).toBe("b")
    expect(result.next).toBeNull()
  })

  it("returns both null for a single-element list", () => {
    const single = [{ slug: "only" }] as unknown as Doc[]
    const result = findNeighbour(single, "only")
    expect(result.previous).toBeNull()
    expect(result.next).toBeNull()
  })

  it("returns both null when the slug is missing", () => {
    const result = findNeighbour(docs, "missing")
    expect(result.previous).toBeNull()
    expect(result.next).toBeNull()
  })
})

describe("normalizeDocDates", () => {
  it("normalizes YAML dates and ISO date strings", () => {
    const metadata = normalizeDocDates({
      createdAt: new Date("2025-02-14T00:00:00.000Z"),
      updatedAt: "2026-11-07T00:00:00.000Z",
    })

    expect(metadata.createdAt).toBe("2025-02-14T00:00:00.000Z")
    expect(metadata.updatedAt).toBe("2026-11-07T00:00:00.000Z")
  })

  it("uses the creation date when the update date is missing or invalid", () => {
    const metadata = normalizeDocDates({
      createdAt: "2025-02-14",
      updatedAt: "not-a-date",
    })

    expect(metadata.updatedAt).toBe(metadata.createdAt)
  })

  it("defaults a missing update date to the creation date", () => {
    const metadata = normalizeDocDates({
      createdAt: "2025-02-14",
    })

    expect(metadata.updatedAt).toBe(metadata.createdAt)
  })

  it("falls back to the update date when the creation date is missing or invalid", () => {
    const metadata = normalizeDocDates({
      createdAt: "not-a-date",
      updatedAt: "2025-02-14",
    })

    expect(metadata.createdAt).toBe(metadata.updatedAt)
  })

  it("provides a valid fallback when both dates are missing or invalid", () => {
    const metadata = normalizeDocDates({
      createdAt: "not-a-date",
      updatedAt: undefined,
    })

    expect(Number.isNaN(new Date(metadata.createdAt).getTime())).toBe(false)
    expect(metadata.updatedAt).toBe(metadata.createdAt)
  })
})

describe("getBlogPosts", () => {
  it("includes the registered business article with valid dates", () => {
    const post = getBlogPosts().find(
      ({ slug }) => slug === "understanding-business-before-building-products"
    )

    if (!post) {
      throw new Error("Registered business article was not loaded")
    }

    expect(post.metadata.title).toBeTruthy()
    expect(post.metadata.description).toBeTruthy()
    expect(Number.isNaN(new Date(post.metadata.createdAt).getTime())).toBe(
      false
    )
    expect(Number.isNaN(new Date(post.metadata.updatedAt).getTime())).toBe(
      false
    )
  })

  it("includes the customer and business goals article", () => {
    const post = getBlogPosts().find(
      ({ slug }) => slug === "aligning-business-and-customer-goals"
    )

    expect(post?.metadata.title).toBe("مواءمة أهداف البزنس والعملاء")
    expect(post?.metadata.image).toBe(
      "/images/blog/aligning-business-and-customer-goals.svg"
    )
  })

  it("uses a local cover for the product-market-fit article", () => {
    const post = getBlogPosts().find(
      ({ slug }) => slug === "product-market-fit-why-good-ux-is-not-enough"
    )

    expect(post?.metadata.image).toBe(
      "/og/blog/product-market-fit-why-good-ux-is-not-enough"
    )
  })

  it("provides an image for every blog post", () => {
    expect(
      getBlogPosts().every(({ metadata }) => Boolean(metadata.image))
    ).toBe(true)
  })

  it("uses a distinct cover image for every registered blog post", () => {
    const posts = getBlogPosts()
    const images = posts.map(getBlogPostImage)

    expect(new Set(images).size).toBe(posts.length)
  })

  it("returns no document for an unregistered slug", () => {
    expect(getDocBySlug("missing-blog-post")).toBeUndefined()
  })
})
