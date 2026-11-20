"use client"

import { ArrowLeftIcon, CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AppLink } from "@/components/app-link"

import type { Template } from "../data/templates"
import { useCart } from "../hooks/use-cart"
import { AddToCartButton } from "./add-to-cart-button"

export function TemplatePurchaseCard({ template }: { template: Template }) {
  const cart = useCart()
  const isFree = template.pricing === "free"

  const includes = [
    `ملف ${template.format} جاهز للنسخ والتعديل`,
    `${template.contents.length} أقسام مرتبة وجاهزة للاستخدام`,
    "استخدام غير محدود في مشروعاتك وفريقك",
  ]

  return (
    <div
      className={cn(
        "relative flex flex-col gap-4 overflow-hidden rounded-xl border p-5",
        isFree
          ? "border-line"
          : "border-primary/40 bg-linear-to-b from-primary/5 to-transparent ring-1 ring-primary/20"
      )}
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">السعر</span>
          {isFree ? (
            <span className="text-4xl font-medium text-foreground">مجاني</span>
          ) : (
            <span className="flex items-baseline gap-1.5">
              <span dir="ltr" className="text-4xl font-medium text-foreground">
                {template.priceUsd}$
              </span>
              <span className="text-sm text-muted-foreground">دفعة واحدة</span>
            </span>
          )}
        </div>

        <span className="font-mono text-xs text-muted-foreground" dir="ltr">
          {template.format}
        </span>
      </div>

      <ul className="flex flex-col gap-2 border-t border-line pt-4">
        {includes.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm text-muted-foreground"
          >
            <CheckIcon
              className="mt-0.5 size-3.5 shrink-0 text-primary"
              aria-hidden
            />
            {item}
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-2">
        <AddToCartButton template={template} size="lg" className="w-full" />
        {cart.has(template.id) && (
          <Button
            size="lg"
            variant="outline"
            className="w-full gap-2"
            nativeButton={false}
            render={<AppLink href="/checkout" />}
          >
            إتمام الطلب
            <ArrowLeftIcon className="size-4" aria-hidden />
          </Button>
        )}
      </div>

      <p className="text-xs/relaxed text-muted-foreground">
        {isFree
          ? "أضفه للسلة وأكمل الطلب باسمك وبريدك، ويصلك رابطه مباشرة."
          : "أضفه للسلة وادفع عبر InstaPay أو المحفظة الإلكترونية، ويصلك رابطه على بريدك بعد تأكيد التحويل."}
      </p>
    </div>
  )
}
