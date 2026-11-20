"use client"

import { ArrowLeftIcon, FileIcon } from "lucide-react"

import { trackEvent } from "@/lib/events"
import { cn } from "@/lib/utils"
import { AppLink } from "@/components/app-link"

import { TEMPLATE_CATEGORIES, type Template } from "../data/templates"
import { getTemplateFileName, getTemplatePath } from "../lib/get-template"
import { AddToCartButton } from "./add-to-cart-button"
import { TemplateCover } from "./template-cover"
import { TemplateTags } from "./template-tags"

const CATEGORY_LABELS = Object.fromEntries(
  TEMPLATE_CATEGORIES.map(({ value, label }) => [value, label])
)

export function TemplatePricingBadge({
  template,
  className,
}: {
  template: Template
  className?: string
}) {
  const isFree = template.pricing === "free"

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
        isFree
          ? "border-emerald-600/20 bg-emerald-50 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-400"
          : "border-amber-600/20 bg-amber-50 text-amber-700 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-400",
        className
      )}
    >
      {isFree ? "مجاني" : `مدفوع · ${template.priceUsd}$`}
    </span>
  )
}

export function TemplateCard({ template }: { template: Template }) {
  return (
    <article className="group/template relative flex h-full flex-col gap-3 p-4 transition-[background-color] ease-out hover:bg-accent-muted">
      <TemplateCover template={template}>
        <TemplatePricingBadge
          template={template}
          className="absolute inset-e-2 top-2 shadow-xs backdrop-blur-sm"
        />
        <span
          className="absolute inset-s-2 bottom-2 rounded-md bg-background/90 px-1.5 py-0.5 font-mono text-[0.65rem] text-muted-foreground shadow-xs"
          dir="ltr"
        >
          {template.format}
        </span>
      </TemplateCover>

      <div className="flex flex-col gap-1">
        <span className="text-xs text-muted-foreground">
          {CATEGORY_LABELS[template.category]}
        </span>
        <h3 className="text-lg/snug font-medium text-balance">
          {template.title}
        </h3>
        <p className="line-clamp-3 text-sm text-pretty text-muted-foreground">
          {template.description}
        </p>
      </div>

      <p className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
        <FileIcon className="size-3.5 shrink-0" aria-hidden />
        <span className="sr-only">اسم الملف: </span>
        <span className="truncate font-mono" dir="ltr">
          {getTemplateFileName(template)}
        </span>
      </p>

      <TemplateTags tags={template.tags} limit={3} />

      <div className="mt-auto flex items-center justify-between gap-2 border-t border-dashed border-line pt-3">
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
    </article>
  )
}
