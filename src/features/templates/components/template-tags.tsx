import { HashIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const LATIN = /^[\x20-\x7E]+$/

/**
 * Tags mix Arabic and English: each one keeps its own language and direction,
 * so an English tag reads left to right inside the Arabic card.
 */
export function TemplateTags({
  tags,
  limit,
  className,
}: {
  tags: string[]
  limit?: number
  className?: string
}) {
  const shown = limit ? tags.slice(0, limit) : tags
  const hidden = tags.length - shown.length

  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)} aria-label="الوسوم">
      {shown.map((tag) => {
        const isLatin = LATIN.test(tag)

        return (
          <li
            key={tag}
            lang={isLatin ? "en" : "ar"}
            dir={isLatin ? "ltr" : "rtl"}
            className={cn(
              "inline-flex items-center gap-1 rounded-md border border-line bg-surface/60 px-1.5 py-0.5 text-xs text-muted-foreground",
              isLatin && "font-mono text-[0.7rem]"
            )}
          >
            <HashIcon className="size-3 opacity-50" aria-hidden />
            {tag}
          </li>
        )
      })}
      {hidden > 0 && (
        <li className="px-1 py-0.5 text-xs text-muted-foreground">+{hidden}</li>
      )}
    </ul>
  )
}
