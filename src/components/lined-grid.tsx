import type { ComponentProps, ReactNode } from "react"

import { cn } from "@/lib/utils"

export function LinedGrid({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn("border-x border-line py-4", className)}>
      <div className="screen-line-top screen-line-bottom relative isolate py-4">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2"
        >
          <div className="border-e border-line" />
          <div className="border-s border-line" />
        </div>

        <ul className="relative z-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {children}
        </ul>
      </div>
    </div>
  )
}

export function LinedGridItem({
  children,
  className,
  ...props
}: ComponentProps<"li">) {
  return (
    <li
      {...props}
      className={cn(
        "min-w-0 max-sm:screen-line-top max-sm:screen-line-bottom sm:screen-line-grid-row sm:nth-[2n+1]:screen-line-top sm:nth-[2n+1]:screen-line-bottom",
        className
      )}
    >
      {children}
    </li>
  )
}
