import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { registry } from "@/registry"

import { BLOG_POST_SLUGS } from "@/features/doc/data/documents"
import { CASE_STUDIES } from "@/features/portfolio/data/case-studies"
import { TEMPLATES } from "@/features/templates/data/templates"

const STATIC_ROUTES = new Set([
  "/",
  "/about",
  "/blog",
  "/case-studies",
  "/consultation",
  "/contact",
  "/newsletter",
  "/templates",
])

const BLOG_SLUGS = new Set(BLOG_POST_SLUGS)
const CASE_STUDY_SLUGS = new Set(CASE_STUDIES.map(({ slug }) => slug))
const TEMPLATE_IDS = new Set(TEMPLATES.map(({ id }) => id))
const PREVIEW_NAMES = new Set(
  registry.items
    .filter(
      (item) =>
        item.type === "registry:block" || item.type === "registry:example"
    )
    .map(({ name }) => name)
)

function isKnownArabicRoute(pathname: string) {
  if (STATIC_ROUTES.has(pathname)) {
    return true
  }

  const segments = pathname.split("/").filter(Boolean)
  const [section, slug] = segments

  if (segments.length === 2 && section === "blog") {
    return BLOG_SLUGS.has(slug)
  }

  if (segments.length === 2 && section === "case-studies") {
    return CASE_STUDY_SLUGS.has(slug)
  }

  if (segments.length === 2 && section === "templates") {
    return TEMPLATE_IDS.has(slug)
  }

  if (segments.length === 2 && section === "preview") {
    return PREVIEW_NAMES.has(slug)
  }

  return false
}

export function getLegacyLocaleTarget(pathname: string) {
  const [, locale, ...segments] = pathname.split("/")
  if (locale !== "ar" && locale !== "en") {
    return null
  }

  const target =
    segments.length === 0
      ? "/"
      : `/${segments.join("/")}`.replace(/\/+$/, "") || "/"
  return isKnownArabicRoute(target) ? target : null
}

export function proxy(request: NextRequest) {
  const target = getLegacyLocaleTarget(request.nextUrl.pathname)
  if (!target) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = target
  return NextResponse.redirect(url, 308)
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
}
