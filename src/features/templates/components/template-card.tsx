"use client"

import { ArrowLeftIcon } from "lucide-react"

import { trackEvent } from "@/lib/events"
import { cn } from "@/lib/utils"
import { AppLink } from "@/components/app-link"

import { TEMPLATE_CATEGORIES, type Template } from "../data/templates"
import { getTemplatePath } from "../lib/get-template"
import { AddToCartButton } from "./add-to-cart-button"

const CATEGORY_LABELS = Object.fromEntries(
  TEMPLATE_CATEGORIES.map(({ value, label }) => [value, label])
)

export function TemplatePricingBadge({ template }: { template: Template }) {
  const isFree = template.pricing === "free"

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
        isFree
          ? "border-emerald-600/20 bg-emerald-50 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400"
          : "border-amber-600/20 bg-amber-50 text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-400"
      )}
    >
      {isFree ? "مجاني" : `مدفوع · ${template.priceUsd}$`}
    </span>
  )
}

export function TemplateCard({ template }: { template: Template }) {
  return (
    <article className="group/template relative flex h-full flex-col gap-3 p-4 transition-[background-color] ease-out hover:bg-accent-muted">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-muted-foreground">
          {CATEGORY_LABELS[template.category]}
        </span>
        <TemplatePricingBadge template={template} />
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-lg/snug font-medium text-balance">
          {template.title}
        </h3>
        <p className="text-sm text-pretty text-muted-foreground">
          {template.description}
        </p>
      </div>

      <ul className="flex flex-wrap gap-1.5" aria-label="الوسوم">
        {template.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border bg-zinc-50 px-2 py-0.5 text-xs text-muted-foreground dark:bg-zinc-900"
          >
            {tag}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center justify-between gap-2 pt-1">
        <span className="font-mono text-xs text-muted-foreground" dir="ltr">
          {template.format}
        </span>

        <div className="flex items-center gap-3">
          {/* Above the card-wide link overlay, so it stays clickable. */}
          <AddToCartButton template={template} className="relative z-10" />

          <AppLink
            href={getTemplatePath(template)}
            className="inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
            onClick={() =>
              trackEvent({
                name: "template_click",
                properties: {
                  template_id: template.id,
                  category: template.category,
                  pricing: template.pricing,
                },
              })
            }
          >
            <span className="absolute inset-0" aria-hidden />
            <span className="sr-only">{template.title}: </span>
            عرض التفاصيل
            <ArrowLeftIcon
              className="size-4 transition-transform ease-out group-hover/template:-translate-x-0.5"
              aria-hidden
            />
          </AppLink>
        </div>
      </div>
    </article>
  )
}
