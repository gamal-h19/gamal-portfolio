"use client"

import { LinkIcon } from "lucide-react"

import { useLanguage } from "@/lib/i18n/language-context"
import { cn } from "@/lib/utils"
import { CopyButton } from "@/components/copy-button"
import { createHeadingUrl } from "@/components/heading"

export function PanelTitleCopy({
  id,
  className,
  ...props
}: Omit<React.ComponentProps<typeof CopyButton>, "id" | "text"> & {
  id: string
}) {
  const { t } = useLanguage()

  return (
    <CopyButton
      className={cn(
        "absolute top-1 ml-1 size-7 shrink-0 border-none text-muted-foreground opacity-0 transition-opacity group-hover/panel-title:opacity-100",
        className
      )}
      variant="ghost"
      text={() => createHeadingUrl(id || "")}
      idleIcon={<LinkIcon />}
      aria-label={t("action.copySectionLink")}
      {...props}
    />
  )
}
