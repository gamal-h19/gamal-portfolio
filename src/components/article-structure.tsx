import type { ReactNode } from "react"
import { CheckIcon, SparklesIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export function ArticleStats({
  children,
  className,
}: {
  children?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "not-prose my-[2.5em] grid gap-3 md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  )
}

export function ArticleStat({
  label,
  value,
  detail,
}: {
  label: string
  value: string
  detail?: string
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface/80 p-4 shadow-[inset_0_0_1px_rgba(255,255,255,0.04)]">
      <div className="text-[10px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
        {label}
      </div>
      <div className="mt-2 text-2xl font-medium tracking-tight text-foreground">
        {value}
      </div>
      {detail ? (
        <p className="mt-2 text-sm/6 text-muted-foreground">{detail}</p>
      ) : null}
    </div>
  )
}

export function ArticleComparison({
  children,
  className,
}: {
  children?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "not-prose my-[2.5em] grid gap-3 md:grid-cols-2",
        className
      )}
    >
      {children}
    </div>
  )
}

export function ArticleComparisonItem({
  title,
  value,
  detail,
  tone = "positive",
}: {
  title: string
  value: string
  detail: string
  tone?: "positive" | "negative"
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-4",
        tone === "positive"
          ? "border-emerald-500/20 bg-emerald-500/5"
          : "border-amber-500/20 bg-amber-500/5"
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-medium text-foreground">{title}</h3>
        <span className="rounded-full border border-current/15 bg-background/60 px-2 py-0.5 text-[10px] font-medium tracking-[0.15em] text-muted-foreground uppercase">
          {value}
        </span>
      </div>
      <p className="mt-3 text-sm/6 text-muted-foreground">{detail}</p>
    </div>
  )
}

export function ArticleChecklist({
  children,
  className,
}: {
  children?: ReactNode
  className?: string
}) {
  return (
    <ul
      className={cn(
        "not-prose my-[2.5em] grid gap-2 rounded-2xl border border-line bg-surface/80 p-4",
        className
      )}
    >
      {children}
    </ul>
  )
}

export function ArticleChecklistItem({ children }: { children?: ReactNode }) {
  return (
    <li className="flex items-start gap-3 text-sm/6 text-foreground">
      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
        <CheckIcon className="size-3.5" />
      </span>
      <span>{children}</span>
    </li>
  )
}

export function ArticleEvidence({
  children,
  className,
}: {
  children?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "not-prose my-[2.5em] grid gap-3 md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  )
}

export function ArticleEvidenceItem({
  title,
  detail,
}: {
  title: string
  detail: string
}) {
  return (
    <div className="rounded-2xl border border-line bg-background/70 p-4">
      <div className="mb-3 flex size-8 items-center justify-center rounded-full bg-primary/8 text-primary">
        <SparklesIcon className="size-4" />
      </div>
      <h3 className="text-sm font-medium text-foreground">{title}</h3>
      <p className="mt-2 text-sm/6 text-muted-foreground">{detail}</p>
    </div>
  )
}
