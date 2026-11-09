"use client"

import { use } from "react"

import type { Locale } from "@/lib/i18n/types"
import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { Activity } from "@/registry/components/contribution-graph"
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/registry/components/contribution-graph"

export function GitHubContributions({
  contributions,
  githubProfileUrl,
  className,
  locale = "en",
}: {
  contributions: Promise<Activity[]>
  githubProfileUrl: string
  className?: string
  locale?: Locale
}) {
  const data = use(contributions)
  const isArabic = locale === "ar"
  const dateLocale = isArabic ? "ar-EG" : "en-US"
  const formatDate = (date: string) =>
    new Intl.DateTimeFormat(dateLocale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(`${date}T12:00:00`))
  const months = Array.from({ length: 12 }, (_, month) =>
    new Intl.DateTimeFormat(dateLocale, {
      month: "short",
      timeZone: "UTC",
    }).format(new Date(Date.UTC(new Date().getUTCFullYear(), month, 1)))
  )

  return (
    <ContributionGraph
      className={cn("mx-auto gap-4 py-4", className)}
      data={data}
      rtl={isArabic}
      blockSize={12}
      blockMargin={2}
      blockRadius={0}
      labels={{
        months,
        totalCount: isArabic
          ? "{{count}} مساهمة في {{year}}"
          : "{{count}} contributions in {{year}}",
        legend: isArabic
          ? { less: "أقل", more: "أكثر" }
          : { less: "Less", more: "More" },
      }}
    >
      <ContributionGraphCalendar
        className="no-scrollbar px-4 **:data-[slot=month-labels]:text-muted-foreground"
        title={isArabic ? "مساهمات GitHub" : "GitHub contributions"}
      >
        {({ activity, dayIndex, weekIndex }) => (
          <Tooltip>
            <TooltipTrigger
              render={
                <g>
                  <ContributionGraphBlock
                    activity={activity}
                    dayIndex={dayIndex}
                    weekIndex={weekIndex}
                  />
                </g>
              }
            />
            <TooltipContent className="font-sans">
              <p>
                {activity.count.toLocaleString(dateLocale)}{" "}
                {isArabic
                  ? activity.count === 1
                    ? "مساهمة في"
                    : "مساهمات في"
                  : `contribution${activity.count === 1 ? "" : "s"} on`}{" "}
                {formatDate(activity.date)}
              </p>
            </TooltipContent>
          </Tooltip>
        )}
      </ContributionGraphCalendar>

      <ContributionGraphFooter className="px-4 text-sm">
        <ContributionGraphTotalCount>
          {({ totalCount }) => (
            <div className="text-pretty text-muted-foreground tabular-nums">
              {isArabic
                ? `${totalCount.toLocaleString(dateLocale)} ${
                    totalCount === 1
                      ? "مساهمة"
                      : totalCount === 2
                        ? "مساهمتان"
                        : totalCount >= 3 && totalCount <= 10
                          ? "مساهمات"
                          : "مساهمة"
                  } خلال آخر ١٢ شهرًا. المصدر: `
                : `${totalCount.toLocaleString(dateLocale)} contribution${
                    totalCount === 1 ? "" : "s"
                  } in the last 12 months. Source: `}
              <a
                className="text-foreground link-underline"
                href={githubProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              .
            </div>
          )}
        </ContributionGraphTotalCount>

        <ContributionGraphLegend aria-hidden className="text-xs" />
      </ContributionGraphFooter>
    </ContributionGraph>
  )
}

export function GitHubContributionsFallback() {
  return (
    <div className="flex h-40.5 w-full items-center justify-center">
      <Spinner className="text-muted-foreground" />
    </div>
  )
}
