import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import type { Template } from "../data/templates"
import { formatPrice, getCartTotal, getTemplatePrice } from "../lib/cart"
import { TemplateThumbnail } from "./template-thumbnail"

export function OrderSummary({
  items,
  onEdit,
  className,
}: {
  items: Template[]
  onEdit?: () => void
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
      <div className="flex items-center justify-between gap-2">
        <h2 id="order-summary-title" className="text-sm font-medium">
          ملخص الطلب
        </h2>
        {onEdit && (
          <Button
            type="button"
            size="xs"
            variant="ghost"
            aria-haspopup="dialog"
            onClick={onEdit}
          >
            تعديل السلة
          </Button>
        )}
      </div>
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
