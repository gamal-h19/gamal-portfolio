"use client"

import { ArrowLeftIcon, ShoppingCartIcon, XIcon } from "lucide-react"

import { useLanguage } from "@/lib/i18n/language-context"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { AppLink } from "@/components/app-link"

import { useCart, useCartSheet } from "../hooks/use-cart"
import { cartNeedsPayment, formatPrice } from "../lib/cart"
import { CartItemList } from "./cart-items"

export function CartSheet() {
  const { dir, t } = useLanguage()
  const cart = useCart()
  const sheet = useCartSheet()
  const needsPayment = cartNeedsPayment(cart.items)

  return (
    <Sheet open={sheet.isOpen} onOpenChange={sheet.setIsOpen}>
      {/* The sheet slides in from the reading end: the left in Arabic, the right in English. */}
      <SheetContent
        side={dir === "rtl" ? "left" : "right"}
        dir={dir}
        showCloseButton={false}
        className="w-full gap-0 sm:max-w-md"
      >
        <SheetHeader className="flex-row items-start justify-between gap-2 border-b border-line">
          <div className="flex flex-col gap-1">
            <SheetTitle className="flex items-center gap-2 text-base">
              <ShoppingCartIcon className="size-4" aria-hidden />
              السلة
              {cart.count > 0 && (
                <span className="rounded-full bg-primary px-1.5 font-mono text-xs text-primary-foreground">
                  {cart.count}
                </span>
              )}
            </SheetTitle>
            <SheetDescription>
              {cart.count === 0
                ? "لم تضف قوالب بعد."
                : "راجع قوالبك ثم أكمل الطلب."}
            </SheetDescription>
          </div>
          <SheetClose render={<Button variant="ghost" size="icon-sm" />}>
            <XIcon />
            <span className="sr-only">{t("common.close")}</span>
          </SheetClose>
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          {cart.count === 0 ? (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-muted">
                <ShoppingCartIcon
                  className="size-5 text-muted-foreground"
                  aria-hidden
                />
              </span>
              <p className="text-sm text-muted-foreground">
                أضف القوالب التي تحتاجها، المجانية والمدفوعة، ثم أكمل طلبك مرة
                واحدة.
              </p>
              <Button
                variant="secondary"
                nativeButton={false}
                render={<AppLink href="/templates" onClick={sheet.close} />}
              >
                تصفح القوالب
              </Button>
            </div>
          ) : (
            <CartItemList
              items={cart.items}
              onRemove={cart.remove}
              onNavigate={sheet.close}
            />
          )}
        </div>

        {cart.count > 0 && (
          <SheetFooter className="gap-3 border-t border-line">
            <div className="flex items-center justify-between text-base font-medium">
              <span>الإجمالي</span>
              <span dir="ltr">{formatPrice(cart.total)}</span>
            </div>
            <p className="text-xs/relaxed text-muted-foreground">
              {needsPayment
                ? "تدفع بتحويل InstaPay أو المحفظة الإلكترونية، وتصلك روابط القوالب المدفوعة بعد تأكيد التحويل."
                : "كل القوالب مجانية: أدخل اسمك وبريدك وتصلك روابطها مباشرة."}
            </p>
            <Button
              size="lg"
              className="w-full gap-2"
              nativeButton={false}
              render={<AppLink href="/checkout" onClick={sheet.close} />}
            >
              إتمام الطلب
              <ArrowLeftIcon className="size-4" aria-hidden />
            </Button>
            <SheetClose
              render={<Button size="lg" variant="ghost" className="w-full" />}
            >
              متابعة التصفح
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
