"use client"

import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

import { useIsClient } from "@/hooks/use-is-client"

import {
  addToCart,
  getCartTemplates,
  getCartTotal,
  removeFromCart,
} from "../lib/cart"

// getOnInit reads localStorage on the first client render; useIsClient keeps
// that render out of hydration, so the server markup never disagrees.
const cartAtom = atomWithStorage<string[]>("templates_cart_v1", [], undefined, {
  getOnInit: true,
})

export function useCart() {
  const isClient = useIsClient()
  const [ids, setIds] = useAtom(cartAtom)

  const items = isClient ? getCartTemplates(ids) : []

  return {
    /** False until the stored cart is read: render no empty state before it. */
    isReady: isClient,
    items,
    count: items.length,
    total: getCartTotal(items),
    has: (id: string) => items.some((item) => item.id === id),
    add: (id: string) => setIds((current) => addToCart(getIds(current), id)),
    remove: (id: string) =>
      setIds((current) => removeFromCart(getIds(current), id)),
    clear: () => setIds([]),
  }
}

function getIds(value: unknown) {
  return getCartTemplates(value).map(({ id }) => id)
}
