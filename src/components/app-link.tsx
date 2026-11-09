"use client"

import type { Route } from "next"
import Link from "next/link"

export function AppLink({
  href,
  ...props
}: Omit<React.ComponentProps<typeof Link>, "href"> & { href: string }) {
  return <Link href={href as Route} {...props} />
}
