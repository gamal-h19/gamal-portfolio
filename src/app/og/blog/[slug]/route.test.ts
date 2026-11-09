import { escapeXml } from "@/utils/string"
import { describe, expect, it } from "vitest"

import { getBlogPosts } from "@/features/doc/data/documents"

import { GET } from "./route"

describe("blog cover image route", () => {
  it("keeps long Arabic titles centered and fully visible", async () => {
    const post = getBlogPosts().find(
      ({ slug }) => slug === "how-to-conduct-effective-user-interviews"
    )

    if (!post) {
      throw new Error("User interview article was not loaded")
    }

    const response = await GET(new Request("https://example.test"), {
      params: Promise.resolve({ slug: post.slug }),
    })
    const svg = await response.text()
    const title = svg.match(/<text x="896"[^>]*>(.*?)<\/text>/)?.[1]

    expect(title).toBeTruthy()
    expect(title?.match(/<tspan\b/g)).toHaveLength(3)
    expect(title?.replace(/<[^>]+>/g, "").replace(/\s+/gu, "")).toBe(
      escapeXml(post.metadata.title).replace(/\s+/gu, "")
    )
    expect(svg).toContain('text-anchor="middle"')
  })

  it("renders a topic illustration for a registered post", async () => {
    const post = getBlogPosts()[0]
    const response = await GET(new Request("https://example.test"), {
      params: Promise.resolve({ slug: post.slug }),
    })
    const svg = await response.text()

    expect(response.status).toBe(200)
    expect(response.headers.get("content-type")).toContain("image/svg+xml")
    expect(svg).toContain(escapeXml(post.metadata.title))
    expect(svg).toContain("رسم توضيحي لموضوع المقال")
  })

  it("returns 404 for an unknown post", async () => {
    const response = await GET(new Request("https://example.test"), {
      params: Promise.resolve({ slug: "missing-post" }),
    })

    expect(response.status).toBe(404)
  })
})
