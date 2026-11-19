import { ZapIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Tag } from "@/components/ui/tag"

export function SprintBadge({
  label = "Sprint",
  className,
}: {
  label?: string
  className?: string
}) {
  return (
    <Tag className={cn("w-fit gap-1 font-sans text-foreground", className)}>
      <ZapIcon className="text-primary" aria-hidden />
      {label}
    </Tag>
  )
}
