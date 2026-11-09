import Image from "next/image"

import { cn } from "@/lib/utils"
import { ImageZoom } from "@/components/kibo-ui/image-zoom"
import type { CaseStudy } from "@/features/portfolio/data/case-studies"

type CaseStudyVisual = NonNullable<CaseStudy["visuals"]>[number]

export function CaseStudyVisualFigure({
  visual,
  number,
  priority = false,
  className,
}: {
  visual: CaseStudyVisual
  number?: string
  priority?: boolean
  className?: string
}) {
  const sources = Array.isArray(visual.src) ? visual.src : [visual.src]

  return (
    <figure className={cn("min-w-0 space-y-3", className)}>
      <div className={cn("grid gap-3", sources.length > 1 && "sm:grid-cols-2")}>
        {sources.map((src, index) => (
          <ImageZoom
            key={`${src}-${index}`}
            className="rounded-md border border-line bg-surface/30"
          >
            <Image
              src={src}
              alt={visual.alt}
              width={visual.width}
              height={visual.height}
              loading={priority ? "eager" : "lazy"}
              sizes="(min-width: 1024px) 900px, (min-width: 640px) 50vw, 100vw"
              className="h-auto w-full cursor-zoom-in object-contain"
            />
          </ImageZoom>
        ))}
      </div>
      <figcaption className="space-y-1">
        <div className="flex items-baseline gap-2">
          {number && (
            <span className="font-mono text-xs text-primary">{number}</span>
          )}
          <p className="font-mono text-[10px] text-primary">{visual.type}</p>
        </div>
        <h3 className="text-sm font-medium text-foreground">{visual.title}</h3>
        <p className="text-xs/relaxed text-muted-foreground sm:text-sm">
          {visual.description}
        </p>
      </figcaption>
    </figure>
  )
}
