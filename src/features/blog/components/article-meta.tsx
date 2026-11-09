"use client"

import {
  ArrowRightIcon,
  CalendarDaysIcon,
  Clock3Icon,
  HistoryIcon,
} from "lucide-react"

import { useLanguage } from "@/lib/i18n/language-context"
import { Button } from "@/components/ui/button"
import { AppLink } from "@/components/app-link"

export function BlogBackLink() {
  const { t } = useLanguage()

  return (
    <Button
      className="h-7 gap-2 border-none px-0 tracking-wider text-muted-foreground hover:text-foreground hover:no-underline"
      variant="link"
      size="sm"
      nativeButton={false}
      render={
        <AppLink href="/blog">
          <ArrowRightIcon />
          {t("blog.title")}
        </AppLink>
      }
    />
  )
}

export function ArticleMeta({
  createdAt,
  updatedAt,
  readingMinutes,
  series,
}: {
  createdAt: string | Date
  updatedAt: string | Date
  readingMinutes: number
  series?: {
    id: string
    title: string
    number: number
    level: string
    total: number
  }
}) {
  const dateLocale = "ar-EG"
  const parseDate = (date: string | Date) => {
    const datePart =
      date instanceof Date ? date.toISOString().slice(0, 10) : date.slice(0, 10)
    return new Date(`${datePart}T12:00:00`)
  }
  const formatDate = (date: string | Date) =>
    new Intl.DateTimeFormat(dateLocale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(parseDate(date))

  const readTime = `${readingMinutes.toLocaleString(dateLocale)} ${
    readingMinutes === 1
      ? "دقيقة قراءة"
      : readingMinutes === 2
        ? "دقيقتان قراءة"
        : "دقائق قراءة"
  }`

  return (
    <div className="border-b border-line px-4 py-3" dir="auto">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <CalendarDaysIcon className="size-4" aria-hidden />
          <time dateTime={parseDate(createdAt).toISOString().slice(0, 10)}>
            {formatDate(createdAt)}
          </time>
        </span>

        <span className="inline-flex items-center gap-1.5">
          <Clock3Icon className="size-4" aria-hidden />
          <span>{readTime}</span>
        </span>

        {parseDate(updatedAt).getTime() !== parseDate(createdAt).getTime() && (
          <span className="inline-flex items-center gap-1.5">
            <HistoryIcon className="size-4" aria-hidden />
            <span>
              آخر تحديث{" "}
              <time dateTime={parseDate(updatedAt).toISOString().slice(0, 10)}>
                {formatDate(updatedAt)}
              </time>
            </span>
          </span>
        )}
      </div>

      {series && (
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <AppLink
            href={`/blog/series/${series.id}`}
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            {series.title}
          </AppLink>
          <span>
            المقال {String(series.number).padStart(2, "0")} من {series.total}
          </span>
          <span>{series.level}</span>
        </div>
      )}
    </div>
  )
}
