import { NextRequest } from "next/server"
import { describe, expect, it } from "vitest"

import { BLOG_POST_SLUGS } from "@/features/doc/data/documents"
import { CASE_STUDIES } from "@/features/portfolio/data/case-studies"

import { getLegacyLocaleTarget, proxy } from "./proxy"

describe("getLegacyLocaleTarget", () => {
  it.each(["ar", "en"])("maps /%s to the Arabic homepage", (locale) => {
    expect(getLegacyLocaleTarget(`/${locale}`)).toBe("/")
  })

  it.each(["about", "blog", "case-studies", "contact", "newsletter"])(
    "maps /ar/%s to its clean route",
    (route) => {
      expect(getLegacyLocaleTarget(`/ar/${route}`)).toBe(`/${route}`)
    }
  )

  it("maps existing article and case-study slugs", () => {
    expect(getLegacyLocaleTarget(`/en/blog/${BLOG_POST_SLUGS[0]}`)).toBe(
      `/blog/${BLOG_POST_SLUGS[0]}`
    )
    expect(
      getLegacyLocaleTarget(`/ar/case-studies/${CASE_STUDIES[0].slug}`)
    ).toBe(`/case-studies/${CASE_STUDIES[0].slug}`)
  })

  it("preserves valid preview routes", () => {
    expect(getLegacyLocaleTarget("/ar/preview/hero-01")).toBe(
      "/preview/hero-01"
    )
    expect(getLegacyLocaleTarget("/en/preview/not-a-preview")).toBeNull()
  })

  it("does not map unknown localized routes", () => {
    expect(getLegacyLocaleTarget("/en/not-a-page")).toBeNull()
    expect(getLegacyLocaleTarget("/en/blog/not-a-post")).toBeNull()
    expect(getLegacyLocaleTarget("/ar/case-studies/not-a-study")).toBeNull()
  })

  it("does not treat non-locale routes as legacy routes", () => {
    expect(getLegacyLocaleTarget("/api/contact")).toBeNull()
    expect(getLegacyLocaleTarget("/blog")).toBeNull()
  })

  it("permanently redirects while preserving the query string", () => {
    const response = proxy(
      new NextRequest("https://example.test/ar/about?utm_source=qa&topic=ux")
    )

    expect(response.status).toBe(308)
    expect(response.headers.get("location")).toBe(
      "https://example.test/about?utm_source=qa&topic=ux"
    )
  })
})
