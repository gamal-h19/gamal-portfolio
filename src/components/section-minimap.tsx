"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

import { useLanguage } from "@/lib/i18n/language-context"
import { TOCMinimap, type TOCItemType } from "@/registry/components/toc-minimap"

export function SectionMinimap() {
  const pathname = usePathname()
  const { locale } = useLanguage()
  const [items, setItems] = useState<TOCItemType[]>([])

  useEffect(() => {
    const main = document.querySelector("main")
    if (!main) return

    let frame = 0
    const updateItems = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const nextItems: TOCItemType[] = []
        const panels = document.querySelectorAll<HTMLElement>(
          "main [data-slot='panel'][id]"
        )

        panels.forEach((panel) => {
          const title = panel.querySelector<HTMLElement>(
            "[data-slot='panel-title']"
          )
          const text = title?.innerText.trim()

          if (text) {
            nextItems.push({
              title: text,
              url: `#${panel.id}`,
              depth: 2,
            })
          }
        })

        setItems((current) =>
          current.length === nextItems.length &&
          current.every(
            (item, index) =>
              item.url === nextItems[index].url &&
              item.title === nextItems[index].title
          )
            ? current
            : nextItems
        )
      })
    }

    const observer = new MutationObserver(updateItems)
    observer.observe(main, { childList: true, subtree: true })
    updateItems()

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [pathname, locale])

  return (
    <TOCMinimap
      items={items}
      className="fixed inset-e-4 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    />
  )
}
