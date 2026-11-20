"use client"

import { ShoppingCartIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useCart, useCartSheet } from "../hooks/use-cart"
import { CartSheet } from "./cart-sheet"

export function CartNavButton() {
  const { count } = useCart()
  const sheet = useCartSheet()
  const label = count > 0 ? `السلة، ${count} قوالب` : "السلة"

  return (
    <>
      <Button
        type="button"
        className="relative touch-manipulation border-none"
        variant="ghost"
        size="icon-sm"
        aria-label={label}
        title={label}
        aria-haspopup="dialog"
        onClick={sheet.open}
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
      <CartSheet />
    </>
  )
}
