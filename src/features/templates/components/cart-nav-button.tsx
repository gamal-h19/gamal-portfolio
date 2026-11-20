"use client"

import { ShoppingCartIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AppLink } from "@/components/app-link"

import { useCart } from "../hooks/use-cart"

export function CartNavButton() {
  const { count } = useCart()
  const label = count > 0 ? `السلة، ${count} قوالب` : "السلة"

  return (
    <Button
      className="relative touch-manipulation border-none"
      variant="ghost"
      size="icon-sm"
      nativeButton={false}
      render={<AppLink href="/cart" aria-label={label} title={label} />}
    >
      <span className="absolute size-12 pointer-fine:hidden" aria-hidden />
      <ShoppingCartIcon className="size-3.5" aria-hidden />
      {count > 0 && (
        <span
          aria-hidden
          className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 font-mono text-[0.6rem] leading-none font-medium text-primary-foreground"
        >
          {count}
        </span>
      )}
    </Button>
  )
}
