"use client"

import { AppLink } from "@/components/app-link"

export function HomeLink() {
  return (
    <AppLink
      href="/"
      aria-label="الرئيسية"
      className="shrink-0 text-2xl leading-none"
    >
      <span aria-hidden="true">🧢</span>
    </AppLink>
  )
}
