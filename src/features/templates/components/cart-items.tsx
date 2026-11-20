"use client"

import { Trash2Icon } from "lucide-react"

import { trackEvent } from "@/lib/events"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AppLink } from "@/components/app-link"

import { TEMPLATE_CATEGORIES, type Template } from "../data/templates"
import { formatPrice, getTemplatePrice } from "../lib/cart"
import { getTemplateFileName, getTemplatePath } from "../lib/get-template"
import { TemplateThumbnail } from "./template-thumbnail"

const CATEGORY_LABELS = Object.fromEntries(
  TEMPLATE_CATEGORIES.map(({ value, label }) => [value, label])
)

export function CartItemList({
  items,
  onRemove,
  onNavigate,
  className,
}: {
  items: Template[]
  onRemove: (id: string) => void
  /** Called when a template link is followed, so a sheet can close. */
  onNavigate?: () => void
  className?: string
}) {
  return (
    <ul
      className={cn(
        "flex flex-col divide-y divide-line rounded-xl border border-line",
        className
      )}
    >
      {items.map((template) => (
        <li key={template.id} className="flex items-center gap-3 p-3">
          <TemplateThumbnail template={template} />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <AppLink
              href={getTemplatePath(template)}
              onClick={onNavigate}
              className="truncate text-sm font-medium underline-offset-4 hover:underline"
            >
              {template.title}
            </AppLink>
            <span className="truncate text-xs text-muted-foreground">
              {CATEGORY_LABELS[template.category]}
            </span>
            <span
              className="truncate font-mono text-[0.7rem] text-muted-foreground"
              dir="ltr"
            >
              {getTemplateFileName(template)}
            </span>
          </div>
          <span className="text-sm font-medium" dir="ltr">
            {formatPrice(getTemplatePrice(template))}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label={`احذف ${template.title} من السلة`}
            title="احذف من السلة"
            onClick={() => {
              onRemove(template.id)
              trackEvent({
                name: "template_remove_from_cart",
                properties: { template_id: template.id },
              })
            }}
          >
            <Trash2Icon className="size-4" aria-hidden />
          </Button>
        </li>
      ))}
    </ul>
  )
}
