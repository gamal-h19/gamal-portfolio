import Image from "next/image"

import { cn } from "@/lib/utils"

import type { Template } from "../data/templates"

const CATEGORY_TONES: Record<Template["category"], string> = {
  ux: "from-sky-100 to-sky-50 dark:from-sky-400/15 dark:to-sky-400/5",
  "product-management":
    "from-amber-100 to-amber-50 dark:from-amber-400/15 dark:to-amber-400/5",
}

const STICKY_COLORS = [
  "bg-amber-200 dark:bg-amber-300/40",
  "bg-sky-200 dark:bg-sky-300/40",
  "bg-rose-200 dark:bg-rose-300/40",
  "bg-emerald-200 dark:bg-emerald-300/40",
]

function Line({ className }: { className?: string }) {
  return (
    <span
      className={cn("block h-1 rounded-full bg-current opacity-20", className)}
    />
  )
}

function SheetDrawing({ template }: { template: Template }) {
  const columns = template.contents.slice(0, 4)

  return (
    <div className="grid grid-cols-4 overflow-hidden rounded-md border border-line bg-background text-[0.55rem]">
      {columns.map((section) => (
        <span
          key={section.title}
          className="truncate border-e border-b border-line bg-primary/10 px-1 py-0.5 font-medium last:border-e-0"
        >
          {section.title}
        </span>
      ))}
      {Array.from({ length: 16 }, (_, index) => (
        <span
          key={index}
          className="border-e border-b border-line p-1 nth-[4n]:border-e-0"
        >
          <Line className={index % 3 === 0 ? "w-3/4" : "w-1/2"} />
        </span>
      ))}
    </div>
  )
}

function CanvasDrawing({ template }: { template: Template }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {template.contents.slice(0, 6).map((section) => (
        <div
          key={section.title}
          className="flex aspect-4/3 flex-col gap-1 rounded-md border border-line bg-background p-1.5"
        >
          <span className="truncate text-[0.5rem] opacity-70">
            {section.title}
          </span>
          <Line className="w-3/4" />
          <Line className="w-1/2" />
        </div>
      ))}
    </div>
  )
}

function BoardDrawing({ template }: { template: Template }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="rounded-sm border border-dashed border-primary/50 bg-background px-2 py-0.5 text-[0.55rem] font-medium">
        {template.contents[0]?.title}
      </span>
      <div className="grid w-full grid-cols-4 gap-2">
        {template.contents.slice(1, 5).map((section, index) => (
          <span
            key={section.title}
            className={cn(
              "flex aspect-square flex-col gap-1 rounded-sm p-1 shadow-sm",
              STICKY_COLORS[index % STICKY_COLORS.length],
              index % 2 === 0 ? "-rotate-2" : "rotate-2"
            )}
          >
            <span className="truncate text-[0.5rem]">{section.title}</span>
            <Line />
          </span>
        ))}
      </div>
    </div>
  )
}

function DocumentDrawing({ template }: { template: Template }) {
  return (
    <div className="flex flex-col gap-1.5 rounded-md border border-line bg-background p-3">
      <span className="truncate text-xs font-medium">{template.title}</span>
      {template.contents.slice(0, 4).map((section) => (
        <span key={section.title} className="flex items-center gap-1.5">
          <span className="size-1 shrink-0 rounded-full bg-primary" />
          <span className="truncate text-[0.55rem] opacity-80">
            {section.title}
          </span>
        </span>
      ))}
    </div>
  )
}

/** The template's picture on its card: its screenshot, else a drawing of it in its tool. */
export function TemplateCover({
  template,
  className,
  children,
}: {
  template: Template
  className?: string
  /** Overlaid on the cover, such as the price badge. */
  children?: React.ReactNode
}) {
  return (
    <div
      className={cn(
        "relative aspect-video overflow-hidden rounded-lg border border-line bg-linear-to-br",
        CATEGORY_TONES[template.category],
        className
      )}
    >
      {template.image ? (
        <Image
          src={template.image}
          alt={`صورة قالب ${template.title}`}
          fill
          sizes="(min-width: 768px) 384px, 100vw"
          className="object-cover object-top"
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-x-5 top-5 text-foreground transition-transform duration-300 ease-out group-hover/template:-translate-y-1"
        >
          {template.format === "Google Sheets" && (
            <SheetDrawing template={template} />
          )}
          {template.format === "Figma" && <CanvasDrawing template={template} />}
          {template.format === "FigJam" && <BoardDrawing template={template} />}
          {template.format === "Notion" && (
            <DocumentDrawing template={template} />
          )}
        </div>
      )}
      {children}
    </div>
  )
}
