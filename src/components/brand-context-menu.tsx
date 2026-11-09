"use client"

import { copyText } from "@/utils/copy"
import { useTiks } from "@rexa-developer/tiks/react"
import { ArrowUpRight, Type } from "lucide-react"

import { useLanguage } from "@/lib/i18n/language-context"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { toast } from "@/components/ui/toast"
import { AppLink } from "@/components/app-link"

import { ChanhDaiMark, getMarkSVG } from "./chanhdai-mark"
import { getWordmarkSVG } from "./chanhdai-wordmark"

export function BrandContextMenu({ children }: { children: React.ReactNode }) {
  const { success } = useTiks()
  const { t } = useLanguage()

  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>

      <ContextMenuContent className="w-fit">
        <ContextMenuItem
          render={<AppLink href="/" target="_blank" rel="noreferrer" />}
        >
          <ArrowUpRight />
          {t("brand.openNewTab")}
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem
          onClick={() => {
            copyText(getMarkSVG())
            toast.add({ type: "success", title: t("command.markCopied") })
            success()
          }}
        >
          <ChanhDaiMark />
          {t("brand.copyMark")}
        </ContextMenuItem>

        <ContextMenuItem
          onClick={() => {
            copyText(getWordmarkSVG())
            toast.add({ type: "success", title: t("command.logotypeCopied") })
            success()
          }}
        >
          <Type />
          {t("brand.copyLogotype")}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}

export default BrandContextMenu
