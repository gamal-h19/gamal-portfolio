import { Suspense } from "react"
import { ChevronDownIcon } from "lucide-react"

import { BookmarkFilters } from "@/features/bookmark/components/bookmark-filters"
import { BookmarkItem } from "@/features/bookmark/components/bookmark-item"
import { BookmarkList } from "@/features/bookmark/components/bookmark-list"
import { BookmarkListFiltered } from "@/features/bookmark/components/bookmark-list-filtered"
import { BOOKMARKS } from "@/features/bookmark/data"
import { sortBookmarksNewestFirst } from "@/features/bookmark/lib/sort"
import {
  BOOKMARK_CATEGORY_TO_PARAM,
  type BookmarkListEntry,
} from "@/features/bookmark/types"

const bookmarks = sortBookmarksNewestFirst(BOOKMARKS)

const entries = bookmarks.map<BookmarkListEntry>((bookmark) => ({
  url: bookmark.url,
  category: BOOKMARK_CATEGORY_TO_PARAM[bookmark.category],
  card: <BookmarkItem bookmark={bookmark} surface="list" />,
}))

export function BookmarkResources() {
  return (
    <section id="resources" className="screen-line-top screen-line-bottom">
      <details className="group">
        <summary className="flex cursor-pointer list-none items-center gap-2 p-4 transition-colors hover:bg-accent-muted [&::-webkit-details-marker]:hidden">
          <span className="flex-1 text-lg font-medium">مصادر أرجع لها</span>
          <span className="font-mono text-sm text-muted-foreground">
            ({bookmarks.length})
          </span>
          <ChevronDownIcon className="size-4 text-muted-foreground transition-transform group-open:rotate-180" />
        </summary>

        <div className="border-t border-line">
          <p className="p-4 text-sm text-muted-foreground">
            مقالات ودورات وأدوات أستفيد منها في التصميم وإدارة المنتجات.
          </p>

          <Suspense fallback={<BookmarkList entries={entries} />}>
            <BookmarkFilters />
            <BookmarkListFiltered entries={entries} />
          </Suspense>
        </div>
      </details>
    </section>
  )
}
