import { cn } from "@/lib/utils"

import type { Template } from "../data/templates"
import { formatPrice, getCartTotal, getTemplatePrice } from "../lib/cart"
import { TemplateThumbnail } from "./template-thumbnail"

export function OrderSummary({
  items,
  className,
}: {
  items: Template[]
  className?: string
}) {
  return (
    <section
      aria-labelledby="order-summary-title"
      className={cn(
        "flex flex-col gap-3 rounded-xl border border-line p-4",
        className
      )}
    >
      <h2 id="order-summary-title" className="text-sm font-medium">
        ملخص الطلب
      </h2>
      <ul className="flex flex-col gap-3">
        {items.map((template) => (
          <li key={template.id} className="flex items-center gap-3">
            <TemplateThumbnail template={template} className="size-10" />
            <span className="min-w-0 flex-1 truncate text-sm">
              {template.title}
            </span>
            <span className="text-sm text-muted-foreground" dir="ltr">
              {formatPrice(getTemplatePrice(template))}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between border-t border-line pt-3 text-sm font-medium">
        <span>الإجمالي</span>
        <span dir="ltr">{formatPrice(getCartTotal(items))}</span>
      </div>
    </section>
  )
}
