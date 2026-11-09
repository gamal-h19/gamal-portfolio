import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { Doc } from "@/features/doc/types/document"

export function DocNeighbourNav({
  previous,
  next,
}: {
  previous: Doc | null
  next: Doc | null
}) {
  return (
    <div className="max-sm:hidden">
      <div className="screen-dashed-line-top" />

      <nav
        className="flex justify-between gap-4 p-4"
        aria-label="السابق والتالي"
      >
        {previous && (
          <Button
            className="min-w-0 shrink border-none"
            variant="secondary"
            size="sm"
            nativeButton={false}
            render={<span />}
          >
            <ArrowLeftIcon data-icon="inline-start" />
            <span className="sr-only">السابق: </span>
            <span className="truncate">{previous.metadata.title}</span>
          </Button>
        )}

        {next && (
          <Button
            className="ml-auto min-w-0 shrink border-none"
            variant="secondary"
            size="sm"
            nativeButton={false}
            render={<span />}
          >
            <span className="sr-only">التالي: </span>
            <span className="truncate">{next.metadata.title}</span>
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
        )}
      </nav>
    </div>
  )
}
