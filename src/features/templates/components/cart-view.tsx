"use client"

import { ArrowLeftIcon, ShoppingCartIcon } from "lucide-react"

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

import { useCart } from "../hooks/use-cart"
import { cartNeedsPayment, formatPrice } from "../lib/cart"
import { CartItemList } from "./cart-items"
import { CheckoutSteps } from "./checkout-steps"

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
          <CartItemList items={cart.items} onRemove={cart.remove} />

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
