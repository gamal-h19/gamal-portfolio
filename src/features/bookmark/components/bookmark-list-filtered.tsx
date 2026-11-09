"use client"

import { Button } from "@/components/ui/button"

import { useBookmarkFilters } from "../lib/search-params"
import type { BookmarkListEntry } from "../types"
import { BookmarkList } from "./bookmark-list"

export function BookmarkListFiltered({
  entries,
}: {
  entries: BookmarkListEntry[]
}) {
  const [filters, setFilters] = useBookmarkFilters()
  const filteredEntries = entries.filter(
    (entry) => !filters.category || entry.category === filters.category
  )

  if (filteredEntries.length === 0) {
    return (
      <div className="flex flex-col items-start gap-2 border-b border-line p-4">
        <p className="font-sans text-sm">
          لا توجد عناصر محفوظة تطابق هذه الفئة.
        </p>

        <Button variant="secondary" size="sm" onClick={() => setFilters(null)}>
          مسح التصفية
        </Button>
      </div>
    )
  }

  return <BookmarkList entries={filteredEntries} />
}
