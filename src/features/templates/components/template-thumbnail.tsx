import { cn } from "@/lib/utils"

import type { Template } from "../data/templates"

const CATEGORY_TONES: Record<Template["category"], string> = {
  ux: "bg-sky-100 text-sky-950 dark:bg-sky-300/15 dark:text-sky-100",
  "product-management":
    "bg-amber-100 text-amber-950 dark:bg-amber-300/15 dark:text-amber-100",
}

/** A small drawing of the template's sections, standing in for a cover image. */
export function TemplateThumbnail({
  template,
  className,
}: {
  template: Template
  className?: string
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "flex size-16 shrink-0 flex-col gap-1 overflow-hidden rounded-lg border border-line p-1.5",
        CATEGORY_TONES[template.category],
        className
      )}
    >
      <span
        className="truncate font-mono text-[0.5rem] leading-none opacity-70"
        dir="ltr"
      >
        {template.format}
      </span>
      <div className="grid flex-1 grid-cols-3 gap-0.5">
        {template.contents.slice(0, 6).map((section) => (
          <span
            key={section.title}
            className="rounded-[2px] bg-current opacity-15"
          />
        ))}
      </div>
    </div>
  )
}
