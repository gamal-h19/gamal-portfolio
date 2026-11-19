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

function isCalEmbedLoaded() {
  return Boolean((window as { Cal?: { instance?: unknown } }).Cal?.instance)
}

/**
 * Opens the cal.com booking page in a popup on top of the site, so the
 * visitor never leaves the portfolio. Until the embed script has loaded (or
 * when a blocker stops it), the click falls through to the link's href.
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
    (event: MouseEvent<HTMLAnchorElement>) => {
      trackConsultationBookClick({ surface })

      const cal = calRef.current
      if (!cal || !isCalEmbedLoaded()) return

      event.preventDefault()
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
