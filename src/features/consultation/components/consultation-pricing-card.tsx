"use client"

import Link from "next/link"
import { CalendarCheckIcon, CheckIcon, ClockIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  CONSULTATION_BOOKING_URL,
  CONSULTATION_DURATION_MIN,
  CONSULTATION_PRICE_USD,
  trackConsultationCtaClick,
} from "@/features/consultation/lib/analytics"

import { ConsultationPaymentMethods } from "./consultation-payment-methods"
import { SprintBadge } from "./sprint-badge"

const SESSION_TITLE = `استشارة ${CONSULTATION_DURATION_MIN} دقيقة مع جمال`

const SESSION_POINTS = [
  "نناقش التحدي الذي تواجهه في منتجك أو تجربة المستخدم.",
  "نراجع رحلة المستخدم ونحدد نقاط الاحتكاك الأهم.",
  "نحدد أولوية واضحة يمكن البدء بها.",
  "تخرج بخطوة تالية عملية لفريقك.",
]

export function ConsultationPricingCard({
  bookingAvailable,
  className,
}: {
  /** False when cal.com could not be reached, so the visitor gets another way to reach out. */
  bookingAvailable: boolean
  className?: string
}) {
  return (
    <div
      dir="rtl"
      className={cn(
        "flex min-w-0 flex-col gap-5 rounded-xl border border-line p-4 sm:p-5",
        className
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <SprintBadge />
          <h2 className="text-xl font-medium text-balance wrap-break-word text-foreground">
            {SESSION_TITLE}
          </h2>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <ClockIcon className="size-3.5 text-primary" aria-hidden />
            {CONSULTATION_DURATION_MIN} دقيقة
          </span>
        </div>

        <p className="flex shrink-0 items-baseline gap-1.5">
          <span dir="ltr" className="text-4xl font-medium text-foreground">
            {CONSULTATION_PRICE_USD}$
          </span>
          <span className="text-sm text-muted-foreground">لكل جلسة</span>
        </p>
      </div>

      <ul className="flex flex-col gap-2 border-t border-line pt-4">
        {SESSION_POINTS.map((point) => (
          <li
            key={point}
            className="flex min-w-0 items-start gap-2 text-sm wrap-break-word text-muted-foreground"
          >
            <CheckIcon
              className="mt-0.5 size-3.5 shrink-0 text-primary"
              aria-hidden
            />
            <span className="min-w-0">{point}</span>
          </li>
        ))}
      </ul>

      <ConsultationPaymentMethods />

      {bookingAvailable ? (
        <Button
          size="sm"
          className="w-full gap-2 sm:w-fit"
          nativeButton={false}
          render={
            <a
              href={CONSULTATION_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`احجز الآن ${SESSION_TITLE} مقابل ${CONSULTATION_PRICE_USD}$ (يفتح في تبويب جديد)`}
              onClick={() =>
                trackConsultationCtaClick({ surface: "consultation_page" })
              }
            />
          }
        >
          <CalendarCheckIcon className="size-3.5" aria-hidden />
          احجز الآن
        </Button>
      ) : (
        <div className="flex flex-col gap-3">
          <Button size="sm" className="w-full gap-2 sm:w-fit" disabled>
            <CalendarCheckIcon className="size-3.5" aria-hidden />
            الحجز غير متاح حاليًا
          </Button>
          <p
            role="status"
            className="text-sm wrap-break-word text-muted-foreground"
          >
            نظام الحجز غير متاح في الوقت الحالي.{" "}
            <Link
              href="/contact"
              className="font-medium text-foreground underline underline-offset-4 hover:text-primary focus-visible:rounded-sm focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
            >
              تواصل معي مباشرة
            </Link>{" "}
            لنحدد موعد الجلسة.
          </p>
        </div>
      )}
    </div>
  )
}
