"use client"

import { useEffect } from "react"
import { XIcon } from "lucide-react"
import { useHotkeys } from "react-hotkeys-hook"

import { trackEvent } from "@/lib/events"
import { useLanguage } from "@/lib/i18n/language-context"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { SearchIcon } from "@/components/icons"

import { useSearchQuery } from "../hooks/use-search-query"

export function PostSearchInput() {
  const { query, setQuery } = useSearchQuery()
  const { t } = useLanguage()

  useHotkeys("esc", () => setQuery(null), { enableOnFormTags: true })

  useEffect(() => {
    if (query && query.length >= 2) {
      const timeoutId = setTimeout(() => {
        trackEvent({
          name: "blog_search",
          properties: {
            query: query,
            query_length: query.length,
          },
        })
      }, 500)

      return () => clearTimeout(timeoutId)
    }
  }, [query])

  return (
    <InputGroup className="rounded-lg shadow-none">
      <InputGroupInput
        placeholder={t("blog.searchPlaceholder")}
        dir="auto"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
        }}
      />

      <InputGroupAddon align="inline-start">
        <SearchIcon />
      </InputGroupAddon>

      <InputGroupAddon
        className="pr-2.25 data-[disabled=true]:hidden"
        align="inline-end"
        data-disabled={!query.length}
      >
        <InputGroupButton
          className="rounded-sm border-none"
          size="icon-xs"
          title={t("blog.clearSearch")}
          aria-label={t("blog.clearSearch")}
          onClick={() => setQuery(null)}
        >
          <XIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
