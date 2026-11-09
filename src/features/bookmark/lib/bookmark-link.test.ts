import { describe, expect, it } from "vitest"

import { getBookmarkExternalHref } from "./bookmark-link"

describe("getBookmarkExternalHref", () => {
  it("does not add attribution parameters when none are configured", () => {
    expect(getBookmarkExternalHref("https://example.com/page")).toBe(
      "https://example.com/page"
    )
  })

  it("preserves existing query parameters", () => {
    const href = getBookmarkExternalHref("https://example.com?atp=ncdai")

    expect(href).toBe("https://example.com/?atp=ncdai")
  })

  it("returns invalid urls unchanged", () => {
    expect(getBookmarkExternalHref("not a url")).toBe("not a url")
  })

  it("normalizes bare origins with a trailing slash", () => {
    expect(getBookmarkExternalHref("https://animations.dev")).toBe(
      "https://animations.dev/"
    )
  })
})
