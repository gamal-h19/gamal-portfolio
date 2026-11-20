"use client"

import { CheckIcon, ShoppingCartIcon } from "lucide-react"

import { trackEvent } from "@/lib/events"
import { Button } from "@/components/ui/button"
import { AppLink } from "@/components/app-link"

import type { Template } from "../data/templates"
import { useCart } from "../hooks/use-cart"

export function AddToCartButton({
  template,
  size = "sm",
  className,
}: {
  template: Template
  size?: "sm" | "lg"
  className?: string
}) {
  const cart = useCart()

  if (cart.has(template.id)) {
    return (
      <Button
        size={size}
        variant="secondary"
        className={className}
        nativeButton={false}
        render={<AppLink href="/cart" />}
      >
        <CheckIcon aria-hidden />
        في السلة
        <span className="sr-only">: {template.title}، اعرض السلة</span>
      </Button>
    )
  }

  return (
    <Button
      type="button"
      size={size}
      variant={template.pricing === "free" ? "secondary" : "default"}
      className={className}
      onClick={() => {
        cart.add(template.id)
        trackEvent({
          name: "template_add_to_cart",
          properties: {
            template_id: template.id,
            pricing: template.pricing,
            price_usd: template.priceUsd ?? 0,
          },
        })
      }}
    >
      <ShoppingCartIcon aria-hidden />
      أضف للسلة
      <span className="sr-only">: {template.title}</span>
    </Button>
  )
}
