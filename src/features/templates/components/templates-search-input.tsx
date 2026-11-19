"use client"

import { useEffect } from "react"
import { XIcon } from "lucide-react"
import { useHotkeys } from "react-hotkeys-hook"

import { trackEvent } from "@/lib/events"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { SearchIcon } from "@/components/icons"

export function TemplatesSearchInput({
  query,
  onQueryChange,
}: {
  query: string
  onQueryChange: (query: string | null) => void
}) {
  useHotkeys("esc", () => onQueryChange(null), { enableOnFormTags: true })

  useEffect(() => {
    if (query.length < 2) return

    const timeoutId = setTimeout(() => {
      trackEvent({
        name: "templates_search",
        properties: { query, query_length: query.length },
      })
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [query])

  return (
    <InputGroup className="rounded-lg shadow-none">
      <InputGroupInput
        type="search"
        placeholder="ابحث في القوالب بالاسم أو الوسم أو الأداة..."
        aria-label="ابحث في القوالب"
        dir="auto"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
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
          title="مسح البحث"
          aria-label="مسح البحث"
          onClick={() => onQueryChange(null)}
        >
          <XIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
