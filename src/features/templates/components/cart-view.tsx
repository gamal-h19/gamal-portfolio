"use client"

import { ArrowLeftIcon, ShoppingCartIcon, Trash2Icon } from "lucide-react"

import { trackEvent } from "@/lib/events"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { AppLink } from "@/components/app-link"

import { TEMPLATE_CATEGORIES } from "../data/templates"
import { useCart } from "../hooks/use-cart"
import { cartNeedsPayment, formatPrice, getTemplatePrice } from "../lib/cart"
import { getTemplatePath } from "../lib/get-template"
import { CheckoutSteps } from "./checkout-steps"
import { TemplateThumbnail } from "./template-thumbnail"

const CATEGORY_LABELS = Object.fromEntries(
  TEMPLATE_CATEGORIES.map(({ value, label }) => [value, label])
)

export function EmptyCart() {
  return (
    <Empty className="py-12">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ShoppingCartIcon />
        </EmptyMedia>
        <EmptyTitle>سلتك فارغة</EmptyTitle>
        <EmptyDescription>
          أضف القوالب التي تحتاجها، المجانية والمدفوعة، ثم أكمل طلبك مرة واحدة.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button nativeButton={false} render={<AppLink href="/templates" />}>
          تصفح القوالب
        </Button>
      </EmptyContent>
    </Empty>
  )
}

export function CartView() {
  const cart = useCart()
  const needsPayment = cartNeedsPayment(cart.items)

  if (!cart.isReady) {
    return <div className="min-h-64" aria-busy />
  }

  return (
    <>
      <CheckoutSteps current="cart" needsPayment={needsPayment} />

      {cart.count === 0 ? (
        <EmptyCart />
      ) : (
        <div className="flex flex-col gap-4 p-4">
          <ul className="flex flex-col divide-y divide-line rounded-xl border border-line">
            {cart.items.map((template) => (
              <li key={template.id} className="flex items-center gap-3 p-3">
                <TemplateThumbnail template={template} />
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <AppLink
                    href={getTemplatePath(template)}
                    className="truncate text-sm font-medium underline-offset-4 hover:underline"
                  >
                    {template.title}
                  </AppLink>
                  <span className="text-xs text-muted-foreground">
                    {CATEGORY_LABELS[template.category]}
                    <span className="mx-1.5 opacity-40" aria-hidden>
                      •
                    </span>
                    <span dir="ltr">{template.format}</span>
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
                    cart.remove(template.id)
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

          <div className="flex flex-col gap-3 rounded-xl border border-line p-4">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>عدد القوالب</span>
              <span>{cart.count}</span>
            </div>
            <div className="flex items-center justify-between text-base font-medium">
              <span>الإجمالي</span>
              <span dir="ltr">{formatPrice(cart.total)}</span>
            </div>
            <p className="text-xs/relaxed text-muted-foreground">
              {needsPayment
                ? "تدفع ما يعادل الإجمالي بالجنيه المصري عبر InstaPay أو المحفظة الإلكترونية، وتصلك روابط القوالب المدفوعة على بريدك بعد تأكيد التحويل."
                : "كل القوالب في سلتك مجانية: أدخل اسمك وبريدك وتصلك روابطها مباشرة."}
            </p>
            <div className="flex flex-wrap gap-2">
              <Button
                size="lg"
                className="flex-1 gap-2"
                nativeButton={false}
                render={<AppLink href="/checkout" />}
              >
                إتمام الطلب
                <ArrowLeftIcon className="size-4" aria-hidden />
              </Button>
              <Button
                size="lg"
                variant="secondary"
                nativeButton={false}
                render={<AppLink href="/templates" />}
              >
                متابعة التصفح
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
