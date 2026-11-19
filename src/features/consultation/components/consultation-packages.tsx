"use client"

import { useState } from "react"
import Link from "next/link"

import { trackConsultationCtaClick } from "@/features/consultation/lib/analytics"
import type { ConsultationPackage } from "@/features/consultation/lib/packages"
import { CONSULTATION_PACKAGES } from "@/features/consultation/lib/packages"

import { ConsultationBookingDialog } from "./consultation-booking-dialog"
import { ConsultationPricingCard } from "./consultation-pricing-card"

export function ConsultationPackages({
  bookingAvailable,
}: {
  bookingAvailable: boolean
}) {
  const [selectedPackage, setSelectedPackage] =
    useState<ConsultationPackage | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  function handleBook(pkg: ConsultationPackage) {
    trackConsultationCtaClick({ surface: "consultation_page", pkg })
    setSelectedPackage(pkg)
    setDialogOpen(true)
  }

  return (
    <div dir="rtl" className="flex flex-col gap-4">
      <div className="grid gap-3 md:grid-cols-3">
        {CONSULTATION_PACKAGES.map((pkg) => (
          <ConsultationPricingCard
            key={pkg.id}
            pkg={pkg}
            bookingAvailable={bookingAvailable}
            onBook={handleBook}
          />
        ))}
      </div>

      {bookingAvailable ? (
        <p className="text-sm wrap-break-word text-muted-foreground">
          اختر موعدك أولًا، وبعد تأكيد الحجز تظهر لك طرق الدفع.
        </p>
      ) : (
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
      )}

      {selectedPackage && (
        <ConsultationBookingDialog
          pkg={selectedPackage}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      )}
    </div>
  )
}
