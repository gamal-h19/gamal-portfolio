"use client"

import { useState } from "react"
import { addQueryParams } from "@/utils/url"
import { XIcon } from "lucide-react"

import { UTM_PARAMS } from "@/config/site"
import { trackEvent } from "@/lib/events"
import { Button } from "@/components/ui/button"
import { SPONSORS } from "@/features/sponsor/data"
import { PAID_TIERS } from "@/features/sponsor/types"

const PLATFORM_SPONSORS = new Set(["Vercel", "Claude"])

const DOC_SPONSORS = SPONSORS.filter(
  (sponsor) =>
    PAID_TIERS.has(sponsor.tier) || PLATFORM_SPONSORS.has(sponsor.name)
)

export function DocSponsors() {
  const [visible, setVisible] = useState(true)

  if (!visible) {
    return null
  }

  return (
    <>
      <div className="screen-dashed-line-top" />

      <div className="p-4">
        <aside
          className="rounded-xl bg-surface p-1 pt-0 inset-ring-1 inset-ring-border/64"
          aria-labelledby="doc-sponsors-heading"
        >
          <div className="flex items-center justify-between pt-1 pb-0.75 pl-3">
            <h2
              id="doc-sponsors-heading"
              className="font-heading text-sm/none font-medium text-muted-foreground"
            >
              الداعمون
            </h2>

            <Button
              aria-label="إغلاق"
              title="إغلاق"
              className="size-7 rounded-lg border-none text-muted-foreground"
              variant="ghost"
              size="icon-sm"
              onClick={() => {
                trackEvent({ name: "doc_sponsors_close" })
                setVisible(false)
              }}
            >
              <XIcon />
            </Button>
          </div>

          <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
            {DOC_SPONSORS.map((item) => (
              <li key={item.name}>
                <a
                  className="flex items-center justify-center rounded-[9px] border bg-background text-foreground [&_svg]:w-full [&_svg]:max-w-75 [&_svg]:shrink-0"
                  href={addQueryParams(item.url, UTM_PARAMS)}
                  target="_blank"
                  rel="noopener sponsored"
                  aria-label={`شعار ${item.name}`}
                >
                  <item.logo aria-hidden />
                </a>
              </li>
            ))}
          </ul>

          <p className="px-3 pt-2 pb-1.5 text-sm text-balance text-muted-foreground">
            بفضل هؤلاء الداعمين، تبقى كل المكونات هنا مجانية ومصممة بعناية.
          </p>
        </aside>
      </div>
    </>
  )
}
