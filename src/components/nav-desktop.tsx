"use client"

import type { Route } from "next"
import { usePathname } from "next/navigation"

import type { NavItem } from "@/types/nav"
import { useLanguage } from "@/lib/i18n/language-context"
import { Nav } from "@/components/nav"

const NAV_KEY_MAP: Record<string, string> = {
  "/": "nav.home",
  "/about": "nav.about",
  "/case-studies": "nav.caseStudies",
  "/blog": "nav.blog",
  "/newsletter": "nav.newsletter",
  "/consultation": "nav.consultation",
  "/contact": "nav.contact",
}

export function NavDesktop({ items }: { items: NavItem<Route>[] }) {
  const pathname = usePathname()
  const { t } = useLanguage()

  const arabicItems = items.map((item) => {
    const key = NAV_KEY_MAP[item.href]
    return {
      ...item,
      ...(key ? { title: t(key) } : {}),
    }
  })

  return (
    <Nav
      className="font-sans max-sm:hidden"
      items={arabicItems}
      activeId={pathname}
    />
  )
}
