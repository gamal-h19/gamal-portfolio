"use client"

import { useEffect, useMemo, useState } from "react"
import Cal, { getCalApi } from "@calcom/embed-react"
import { CircleCheckIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { trackConsultationBookingConfirmed } from "@/features/consultation/lib/analytics"
import type { ConsultationPackage } from "@/features/consultation/lib/packages"
import { CONSULTATION_CAL_LINK } from "@/features/consultation/lib/packages"

import { ConsultationPaymentMethods } from "./consultation-payment-methods"

const CAL_NAMESPACE = "consultation"

export function ConsultationBookingDialog({
  pkg,
  open,
  onOpenChange,
}: {
  pkg: ConsultationPackage
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        dir="rtl"
        className="flex h-[min(90dvh,52rem)] max-w-[calc(100%-1rem)] flex-col gap-0 overflow-hidden p-0 font-eight font-features-['ss01','zero'] sm:max-w-4xl"
      >
        {/* Keyed so reopening the dialog starts a fresh booking. */}
        <BookingFlow key={pkg.id} pkg={pkg} />
      </DialogContent>
    </Dialog>
  )
}

function BookingFlow({ pkg }: { pkg: ConsultationPackage }) {
  const [confirmed, setConfirmed] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    let cancelled = false
    let cal: Awaited<ReturnType<typeof getCalApi>> | undefined
    const onBookingSuccessful = () => {
      setConfirmed(true)
      trackConsultationBookingConfirmed({ pkg })
    }

    getCalApi({ namespace: CAL_NAMESPACE }).then((api) => {
      if (cancelled) return
      cal = api
      api("on", {
        action: "bookingSuccessfulV2",
        callback: onBookingSuccessful,
      })
    })

    return () => {
      cancelled = true
      cal?.("off", {
        action: "bookingSuccessfulV2",
        callback: onBookingSuccessful,
      })
    }
  }, [pkg])

  const calConfig = useMemo(
    () => ({
      layout: "month_view" as const,
      theme: resolvedTheme === "dark" ? ("dark" as const) : ("light" as const),
      // Picks the package's length when the cal.com event allows several durations.
      duration: String(pkg.durationMin),
      "metadata[package]": pkg.id,
    }),
    [pkg, resolvedTheme]
  )

  return (
    <>
      <DialogHeader className="border-b border-line p-4 ps-14 text-right">
        <DialogTitle>
          {confirmed ? "تم تأكيد موعدك" : `احجز موعد ${pkg.name}`}
        </DialogTitle>
        <DialogDescription>
          {pkg.durationMin} دقيقة · <span dir="ltr">{pkg.priceUsd}$</span>
        </DialogDescription>
      </DialogHeader>

      {confirmed ? (
        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 sm:p-6">
          <div className="flex items-start gap-3">
            <CircleCheckIcon
              className="mt-0.5 size-5 shrink-0 text-primary"
              aria-hidden
            />
            <p className="text-sm wrap-break-word text-muted-foreground">
              وصلتك تفاصيل الموعد على بريدك الإلكتروني. أكمل الدفع الآن لتثبيت
              الجلسة.
            </p>
          </div>

          <ConsultationPaymentMethods pkg={pkg} />

          <DialogClose
            render={<Button size="sm" className="w-full sm:w-fit" />}
          >
            تم
          </DialogClose>
        </div>
      ) : (
        <div className="min-h-0 flex-1 overflow-y-auto">
          <Cal
            namespace={CAL_NAMESPACE}
            calLink={CONSULTATION_CAL_LINK}
            config={calConfig}
            className="size-full"
          />
        </div>
      )}
    </>
  )
}
