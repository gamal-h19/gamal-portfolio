"use client"

import type { MouseEvent } from "react"
import { useCallback, useEffect, useRef } from "react"
import { getCalApi } from "@calcom/embed-react"
import { useTheme } from "next-themes"

import {
  CONSULTATION_CAL_LINK,
  trackConsultationBookClick,
  trackConsultationBookingComplete,
  type ConsultationSurface,
} from "@/features/consultation/lib/analytics"

type CalApi = Awaited<ReturnType<typeof getCalApi>>

const CAL_NAMESPACE = "consultation"

/**
 * Opens the cal.com booking page in a popup on top of the site, so the
 * visitor never leaves the portfolio. A click before the embed script has
 * loaded is queued by cal.com and opens the popup once it is ready.
 */
export function useConsultationBooking(surface: ConsultationSurface) {
  const calRef = useRef<CalApi | null>(null)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    let active = true
    const onBookingSuccessful = (
      event: CustomEvent<{
        data: { status: string | undefined; paymentRequired: boolean }
      }>
    ) => {
      trackConsultationBookingComplete({
        surface,
        status: event.detail.data.status ?? null,
        payment_required: event.detail.data.paymentRequired,
      })
    }

    getCalApi({ namespace: CAL_NAMESPACE }).then((cal) => {
      if (!active) return
      calRef.current = cal
      cal("ui", { layout: "month_view" })
      cal("preload", { calLink: CONSULTATION_CAL_LINK })
      cal("on", {
        action: "bookingSuccessfulV2",
        callback: onBookingSuccessful,
      })
    })

    return () => {
      active = false
      calRef.current?.("off", {
        action: "bookingSuccessfulV2",
        callback: onBookingSuccessful,
      })
    }
  }, [surface])

  return useCallback(
    async (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      trackConsultationBookClick({ surface })

      const cal =
        calRef.current ?? (await getCalApi({ namespace: CAL_NAMESPACE }))
      cal("modal", {
        calLink: CONSULTATION_CAL_LINK,
        config: {
          layout: "month_view",
          theme: resolvedTheme === "dark" ? "dark" : "light",
        },
      })
    },
    [surface, resolvedTheme]
  )
}
