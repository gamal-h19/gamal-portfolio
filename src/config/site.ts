import type { Route } from "next"

import type { NavItem } from "@/types/nav"
import { SITE_URL } from "@/lib/site-url"
import { SOCIAL } from "@/features/portfolio/data/social-links"
import { USER } from "@/features/portfolio/data/user"

export const SITE_INFO = {
  name: USER.displayName,
  url: SITE_URL,
  ogImage: USER.ogImage || "/favicon.svg",
  description:
    "أحوّل أبحاث المستخدمين إلى قرارات وتصاميم تساعد على بناء منتجات رقمية واضحة وأسهل استخدامًا، في مجالات التعليم والرعاية والخدمات القانونية.",
  keywords: USER.keywords,
}

export const LICENSE = {
  name: "MIT License",
  url: "/LICENSE",
}

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}

export const SITE_ROUTES: NavItem<Route>[] = [
  {
    title: "Home",
    href: "/" as Route,
  },
  {
    title: "About",
    href: "/about" as Route,
  },
  {
    title: "Case Studies",
    href: "/case-studies" as Route,
  },
  {
    title: "Blog",
    href: "/blog" as Route,
  },
  {
    title: "Newsletter",
    href: "/newsletter" as Route,
  },
  {
    title: "Contact",
    href: "/contact" as Route,
  },
]

export const MAIN_NAV: NavItem<Route>[] = SITE_ROUTES.filter(
  (item) => item.href !== "/"
)

export const MOBILE_NAV: NavItem<Route>[] = SITE_ROUTES

export const X_HANDLE = SOCIAL.x.handle
export const GITHUB_USERNAME = SOCIAL.github.handle
export const SOURCE_CODE_GITHUB_REPO = ""
export const SOURCE_CODE_GITHUB_URL = ""

export const SPONSORSHIP_URL = ""

export const UTM_PARAMS: Record<string, string> = {}
