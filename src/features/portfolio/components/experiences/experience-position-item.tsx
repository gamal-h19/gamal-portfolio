import { differenceInMonths, parse } from "date-fns"
import { BriefcaseBusinessIcon } from "lucide-react"

import { useLanguage } from "@/lib/i18n/language-context"
import { cn } from "@/lib/utils"
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { IconTile } from "@/components/ui/icon-tile"
import { Separator } from "@/components/ui/separator"
import { Tag } from "@/components/ui/tag"
import {
  Collapsible,
  CollapsibleChevronsUpDownIcon,
} from "@/components/collapsible-animated"
import { Markdown } from "@/components/markdown"
import type { ExperiencePosition } from "@/features/portfolio/types/experiences"

export function ExperiencePositionItem({
  position,
}: {
  position: ExperiencePosition
}) {
  const { t } = useLanguage()
  const { start, end } = position.employmentPeriod
  const duration = formatDuration(start, end)

  return (
    <Collapsible
      className="group/experience-position relative"
      defaultOpen={position.isExpanded}
      disabled={!position.description}
    >
      <div className="pointer-events-none absolute inset-s-3 bottom-0 hidden size-4 bg-background group-last/experience-position:flex">
        <span className="size-full -translate-y-2.25 rounded-es-sm border-s border-b" />
      </div>

      <CollapsibleTrigger
        className={cn(
          "group block w-full",
          "text-right",
          "relative before:absolute before:inset-s-7 before:-inset-e-1 before:-top-1 before:-bottom-1.5 before:-z-1 before:rounded-lg before:transition-[background-color] before:ease-out hover:before:bg-accent-muted",
          "outline-none focus-visible:before:inset-ring-2 focus-visible:before:inset-ring-ring/50",
          "data-disabled:before:content-none"
        )}
      >
        <div
          className={cn(
            "relative z-1 mb-1 flex gap-3 text-base",
            "items-center"
          )}
        >
          <IconTile>{position.icon ?? <BriefcaseBusinessIcon />}</IconTile>

          <h4 className="flex-1 font-medium text-balance">{position.title}</h4>

          <div className="shrink-0 text-muted-foreground group-data-disabled:hidden [&_svg]:h-lh [&_svg]:w-4">
            <CollapsibleChevronsUpDownIcon duration={0.15} />
          </div>
        </div>

        {/* Separators are aria-hidden: a dl may only expose dt/dd groups, and these dividers are decorative. */}
        <dl
          className="flex items-center gap-2 ps-9 text-sm text-muted-foreground"
          dir="auto"
        >
          {position.employmentType && (
            <>
              <div>
                <dt className="sr-only">{t("experience.employmentType")}</dt>
                <dd>{position.employmentType}</dd>
              </div>
              <Separator
                className="data-vertical:h-4 data-vertical:self-center"
                orientation="vertical"
                aria-hidden
              />
            </>
          )}

          <div>
            <dt className="sr-only">{t("experience.employmentPeriod")}</dt>
            <dd className="flex items-center gap-0.5 tabular-nums">
              <span>{formatPeriod(start)}</span>
              <span className="font-mono" dir="ltr">
                —
              </span>
              {!end ? (
                <span className="font-sans">{t("experience.present")}</span>
              ) : (
                <span>{formatPeriod(end)}</span>
              )}
            </dd>
          </div>

          {duration && (
            <>
              <Separator
                className="data-vertical:h-4 data-vertical:self-center"
                orientation="vertical"
                aria-hidden
              />
              <div>
                <dt className="sr-only">{t("experience.duration")}</dt>
                <dd className="tabular-nums">{duration}</dd>
              </div>
            </>
          )}
        </dl>
      </CollapsibleTrigger>

      <CollapsibleContent className="overflow-hidden">
        {position.description && (
          <div className="typeset typeset-description ps-9 pt-3 pb-1">
            <Markdown>{position.description}</Markdown>
          </div>
        )}
      </CollapsibleContent>

      {Array.isArray(position.skills) && position.skills.length > 0 && (
        <ul className="flex flex-wrap gap-1.5 ps-9 pt-3">
          {position.skills.map((skill, index) => (
            <li key={index} className="flex">
              <Tag className="font-sans">{skill}</Tag>
            </li>
          ))}
        </ul>
      )}
    </Collapsible>
  )
}

function formatDuration(start: string, end: string | undefined): string {
  const startHasMonth = start.includes(".")
  const endHasMonth = end ? end.includes(".") : true

  // Both year-only: granularity is years, no month arithmetic needed.
  if (!startHasMonth && end && !endHasMonth) {
    const years = parseInt(end, 10) - parseInt(start, 10)
    if (years <= 0) {
      return ""
    }
    return formatArabicDuration(years, 0)
  }

  const startDate = parsePeriodDate(start, "first")
  const endDate = end ? parsePeriodDate(end, "last") : new Date()

  // +1 to count both the start and end months inclusively.
  const totalMonths = differenceInMonths(endDate, startDate) + 1
  if (totalMonths <= 0) {
    return ""
  }

  if (totalMonths < 12) {
    return formatArabicDuration(0, totalMonths)
  }

  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  if (months === 0) {
    return formatArabicDuration(years, 0)
  }
  return formatArabicDuration(years, months)
}

function formatPeriod(value: string) {
  const [month, year] = value.includes(".")
    ? value.split(".")
    : [undefined, value]
  const date = new Date(Number(year), month ? Number(month) - 1 : 0, 1)

  return new Intl.DateTimeFormat("ar-EG", {
    ...(month ? { month: "long" as const } : {}),
    year: "numeric",
    calendar: "gregory",
  }).format(date)
}

function formatArabicDuration(years: number, months: number) {
  const formatUnit = (
    count: number,
    forms: Record<Intl.LDMLPluralRule, string>
  ) =>
    `${new Intl.NumberFormat("ar-EG").format(count)} ${
      forms[new Intl.PluralRules("ar").select(count)]
    }`

  const parts: string[] = []
  if (years > 0) {
    parts.push(
      formatUnit(years, {
        zero: "سنة",
        one: "سنة",
        two: "سنتين",
        few: "سنوات",
        many: "سنة",
        other: "سنة",
      })
    )
  }
  if (months > 0) {
    parts.push(
      formatUnit(months, {
        zero: "شهر",
        one: "شهر",
        two: "شهرين",
        few: "أشهر",
        many: "شهرًا",
        other: "شهر",
      })
    )
  }

  return parts.join(" و")
}

function parsePeriodDate(str: string, fallbackMonth: "first" | "last"): Date {
  if (str.includes(".")) {
    return parse(str, "MM.yyyy", new Date())
  }
  return parse(
    `${fallbackMonth === "last" ? "12" : "01"}.${str}`,
    "MM.yyyy",
    new Date()
  )
}
