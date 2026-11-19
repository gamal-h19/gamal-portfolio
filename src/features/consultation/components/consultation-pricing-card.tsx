"use client"

import { CalendarCheckIcon, CheckIcon, ClockIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { ConsultationPackage } from "@/features/consultation/lib/packages"

import { SprintBadge } from "./sprint-badge"

export function ConsultationPricingCard({
  pkg,
  bookingAvailable,
  onBook,
  className,
}: {
  pkg: ConsultationPackage
  /** False when cal.com could not be reached, so the button is disabled. */
  bookingAvailable: boolean
  onBook: (pkg: ConsultationPackage) => void
  className?: string
}) {
  return (
    <div
      dir="rtl"
      className={cn(
        "flex min-w-0 flex-col gap-4 rounded-xl border border-line p-4",
        pkg.highlighted && "border-primary/60 ring-1 ring-primary/30",
        className
      )}
    >
      <div className="flex min-w-0 flex-col gap-2">
        {pkg.highlighted && <SprintBadge label="الأكثر طلبًا" />}
        <h2 className="text-lg font-medium text-balance wrap-break-word text-foreground">
          {pkg.name}
        </h2>
        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <ClockIcon className="size-3.5 text-primary" aria-hidden />
          {pkg.durationMin} دقيقة
        </span>
      </div>

      <p className="flex items-baseline gap-1.5">
        <span dir="ltr" className="text-4xl font-medium text-foreground">
          {pkg.priceUsd}$
        </span>
        <span className="text-sm text-muted-foreground">لكل جلسة</span>
      </p>

      <ul className="flex flex-1 flex-col gap-2 border-t border-line pt-4">
        {pkg.points.map((point) => (
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

      <Button
        size="sm"
        variant={pkg.highlighted ? "default" : "secondary"}
        className="w-full gap-2"
        disabled={!bookingAvailable}
        aria-label={`احجز ${pkg.name}: ${pkg.durationMin} دقيقة مقابل ${pkg.priceUsd}$`}
        onClick={() => onBook(pkg)}
      >
        <CalendarCheckIcon className="size-3.5" aria-hidden />
        {bookingAvailable ? "احجز الآن" : "الحجز غير متاح حاليًا"}
      </Button>
    </div>
  )
}
