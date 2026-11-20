import { ChevronLeftIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import type { Template, TemplateSection } from "../data/templates"

const STICKY_COLORS = [
  "bg-amber-100 text-amber-950 dark:bg-amber-300/20 dark:text-amber-100",
  "bg-sky-100 text-sky-950 dark:bg-sky-300/20 dark:text-sky-100",
  "bg-rose-100 text-rose-950 dark:bg-rose-300/20 dark:text-rose-100",
  "bg-emerald-100 text-emerald-950 dark:bg-emerald-300/20 dark:text-emerald-100",
  "bg-violet-100 text-violet-950 dark:bg-violet-300/20 dark:text-violet-100",
  "bg-orange-100 text-orange-950 dark:bg-orange-300/20 dark:text-orange-100",
]

const STICKY_TILTS = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"]

function SkeletonLine({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "block h-1.5 rounded-full bg-current opacity-15",
        className
      )}
    />
  )
}

function WindowChrome({
  template,
  children,
}: {
  template: Template
  children: React.ReactNode
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-background shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.12)]">
      <div className="flex items-center gap-3 border-b border-line bg-surface/60 px-3 py-2">
        <div className="flex gap-1.5" dir="ltr" aria-hidden>
          <span className="size-2.5 rounded-full bg-red-400/80" />
          <span className="size-2.5 rounded-full bg-amber-400/80" />
          <span className="size-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <p className="min-w-0 flex-1 truncate text-center text-xs text-muted-foreground">
          {template.title}
        </p>
        <span
          className="font-mono text-[0.65rem] text-muted-foreground"
          dir="ltr"
        >
          {template.format}
        </span>
      </div>
      {children}
    </div>
  )
}

function CanvasPreview({ sections }: { sections: TemplateSection[] }) {
  return (
    <div className="bg-surface/40 bg-[radial-gradient(var(--line)_1px,transparent_1px)] bg-size-[16px_16px] p-4 sm:p-6">
      <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3">
        {sections.map((section, index) => (
          <div key={section.title} className="flex min-w-0 flex-col gap-1">
            <span className="truncate text-[0.65rem] text-muted-foreground">
              {section.title}
            </span>
            <div className="flex aspect-4/3 flex-col gap-2 rounded-md border border-line bg-background p-2.5 text-foreground">
              <span className="font-mono text-[0.6rem] text-primary">
                {(index + 1).toString().padStart(2, "0")}
              </span>
              <SkeletonLine className="w-3/4" />
              <SkeletonLine className="w-1/2" />
              <div className="mt-auto grid grid-cols-3 gap-1">
                {[0, 1, 2].map((cell) => (
                  <span
                    key={cell}
                    aria-hidden
                    className="h-4 rounded-sm bg-current opacity-[0.06]"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function BoardPreview({ sections }: { sections: TemplateSection[] }) {
  return (
    <div className="bg-surface/40 bg-[radial-gradient(var(--line)_1px,transparent_1px)] bg-size-[16px_16px] p-4 sm:p-6">
      <div className="mx-auto mb-5 w-fit rounded-md border border-dashed border-primary/50 bg-background px-4 py-2 text-sm font-medium">
        {sections[0]?.title}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {sections.slice(1).map((section, index) => (
          <div
            key={section.title}
            className={cn(
              "flex aspect-square flex-col gap-2 rounded-sm p-3 shadow-sm",
              STICKY_COLORS[index % STICKY_COLORS.length],
              STICKY_TILTS[index % STICKY_TILTS.length]
            )}
          >
            <span className="text-xs font-medium text-balance">
              {section.title}
            </span>
            <SkeletonLine className="w-full" />
            <SkeletonLine className="w-2/3" />
          </div>
        ))}
      </div>
    </div>
  )
}

function DocumentPreview({
  template,
  sections,
}: {
  template: Template
  sections: TemplateSection[]
}) {
  return (
    <div className="px-5 py-6 sm:px-10">
      <div className="mb-4 flex size-10 items-center justify-center rounded-md bg-surface font-mono text-sm text-primary">
        {template.title.charAt(0)}
      </div>
      <p className="mb-1 text-xl font-medium text-foreground">
        {template.title}
      </p>
      <div className="mb-5 flex flex-wrap gap-1.5">
        {template.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-sm bg-surface px-1.5 py-0.5 text-[0.65rem] text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
      <ul className="flex flex-col gap-3">
        {sections.map((section, index) => (
          <li key={section.title} className="flex flex-col gap-1.5">
            <span className="flex items-center gap-1 text-sm font-medium text-foreground">
              <ChevronLeftIcon
                className={cn(
                  "size-3.5 text-muted-foreground",
                  index === 0 && "-rotate-90"
                )}
                aria-hidden
              />
              {section.title}
            </span>
            {index === 0 && (
              <div className="flex flex-col gap-1.5 ps-5 text-foreground">
                <SkeletonLine className="w-11/12" />
                <SkeletonLine className="w-3/4" />
                <SkeletonLine className="w-5/6" />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

function SpreadsheetPreview({ sections }: { sections: TemplateSection[] }) {
  const columns = sections.slice(0, 5)
  const rows = [0, 1, 2, 3, 4]
  const widths = ["w-3/4", "w-1/2", "w-2/3", "w-5/6", "w-1/3"]

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-120 border-collapse text-xs">
        <thead>
          <tr className="bg-surface/60 text-muted-foreground">
            <th className="w-8 border-e border-b border-line" aria-hidden />
            {columns.map((_, index) => (
              <th
                key={index}
                className="border-e border-b border-line py-1 font-mono font-normal"
              >
                {String.fromCharCode(65 + index)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-e border-b border-line bg-surface/60 text-center font-mono text-muted-foreground">
              1
            </td>
            {columns.map((section) => (
              <td
                key={section.title}
                className="truncate border-e border-b border-line bg-primary/5 px-2 py-1.5 font-medium text-foreground"
              >
                {section.title}
              </td>
            ))}
          </tr>
          {rows.map((row) => (
            <tr key={row}>
              <td className="border-e border-b border-line bg-surface/60 text-center font-mono text-muted-foreground">
                {row + 2}
              </td>
              {columns.map((section, index) => (
                <td
                  key={section.title}
                  className="border-e border-b border-line p-2 text-foreground"
                >
                  <SkeletonLine
                    className={widths[(row + index) % widths.length]}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** A drawing of the template's structure in its tool, built from its sections. */
export function TemplatePreview({ template }: { template: Template }) {
  const { contents } = template

  return (
    <WindowChrome template={template}>
      {template.format === "Figma" && <CanvasPreview sections={contents} />}
      {template.format === "FigJam" && <BoardPreview sections={contents} />}
      {template.format === "Notion" && (
        <DocumentPreview template={template} sections={contents} />
      )}
      {template.format === "Google Sheets" && (
        <SpreadsheetPreview sections={contents} />
      )}
    </WindowChrome>
  )
}
